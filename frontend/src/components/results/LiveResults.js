import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, Users, CheckCircle, Radio } from 'lucide-react';
import { useSocket } from '../../contexts/SocketContext';

const LiveResults = ({ electionId, initialResults }) => {
  const [results, setResults] = useState(initialResults || []);
  const [totalVotes, setTotalVotes] = useState(0);
  const [recentVotes, setRecentVotes] = useState([]);
  const [isLive, setIsLive] = useState(false);
  const { connected, subscribeToElection, subscribeToVotes } = useSocket();

  useEffect(() => {
    if (!connected || !electionId) return;

    setIsLive(true);

    // Subscribe to election updates
    const unsubscribeElection = subscribeToElection(electionId, (data) => {
      console.log('Election update received:', data);
      if (data.results) {
        setResults(data.results);
        setTotalVotes(data.totalVotes || 0);
      }
    });

    // Subscribe to individual votes
    const unsubscribeVotes = subscribeToVotes(electionId, (voteData) => {
      console.log('New vote received:', voteData);
      
      // Add to recent votes list
      setRecentVotes(prev => [
        {
          id: Date.now(),
          candidateName: voteData.candidateName,
          timestamp: new Date(),
        },
        ...prev.slice(0, 4), // Keep only last 5
      ]);

      // Update results
      setResults(prevResults => {
        return prevResults.map(candidate => {
          if (candidate.id === voteData.candidateId) {
            return {
              ...candidate,
              votes: candidate.votes + 1,
            };
          }
          return candidate;
        });
      });

      setTotalVotes(prev => prev + 1);

      // Remove from recent votes after 5 seconds
      setTimeout(() => {
        setRecentVotes(prev => prev.filter(v => v.id !== Date.now()));
      }, 5000);
    });

    return () => {
      if (unsubscribeElection) unsubscribeElection();
      if (unsubscribeVotes) unsubscribeVotes();
      setIsLive(false);
    };
  }, [connected, electionId, subscribeToElection, subscribeToVotes]);

  const getPercentage = (votes) => {
    if (totalVotes === 0) return 0;
    return ((votes / totalVotes) * 100).toFixed(2);
  };

  const getLeader = () => {
    if (results.length === 0) return null;
    return results.reduce((prev, current) =>
      prev.votes > current.votes ? prev : current
    );
  };

  const leader = getLeader();

  return (
    <div className="space-y-6">
      {/* Live Indicator */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          {isLive && connected ? (
            <>
              <div className="relative">
                <Radio className="h-5 w-5 text-red-500 animate-pulse" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-ping"></span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">LIVE Results</span>
            </>
          ) : (
            <>
              <Activity className="h-5 w-5 text-gray-400" />
              <span className="font-semibold text-gray-600 dark:text-gray-400">Results</span>
            </>
          )}
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Users className="h-4 w-4" />
          <span>{totalVotes.toLocaleString()} votes</span>
        </div>
      </div>

      {/* Recent Votes Ticker */}
      {recentVotes.length > 0 && (
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 border border-primary-200 dark:border-primary-800">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-4 w-4 text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-semibold text-primary-900 dark:text-primary-100">Recent Votes</span>
          </div>
          <div className="space-y-2">
            {recentVotes.map((vote) => (
              <div
                key={vote.id}
                className="flex items-center justify-between text-sm animate-fade-in-up"
              >
                <span className="text-gray-700 dark:text-gray-300">
                  Vote cast for <span className="font-semibold">{vote.candidateName}</span>
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(vote.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results Cards */}
      <div className="space-y-4">
        {results
          .sort((a, b) => b.votes - a.votes)
          .map((candidate, index) => {
            const percentage = getPercentage(candidate.votes);
            const isLeading = leader && candidate.id === leader.id;

            return (
              <div
                key={candidate.id}
                className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border transition-all duration-300 ${
                  isLeading
                    ? 'border-primary-500 ring-2 ring-primary-200 dark:ring-primary-800'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                        isLeading
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {candidate.name}
                        </h3>
                        {isLeading && (
                          <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold rounded-full">
                            Leading
                          </span>
                        )}
                      </div>
                      {candidate.party && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">{candidate.party}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {candidate.votes.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{percentage}%</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                      isLeading
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600'
                        : 'bg-gray-400 dark:bg-gray-600'
                    }`}
                    style={{ width: `${percentage}%` }}
                  >
                    {isLeading && percentage > 10 && (
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Summary */}
      {results.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Votes</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {totalVotes.toLocaleString()}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Leading Candidate</div>
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {leader?.name || 'N/A'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Lead Margin</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {leader && results[1]
                  ? `${(leader.votes - results[1].votes).toLocaleString()} votes`
                  : 'N/A'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveResults;
