import React, { useState, useEffect } from 'react';
import { PieChart, Pie, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Users, Vote, Activity, Award, Clock } from 'lucide-react';

const AnalyticsDashboard = ({ electionId }) => {
  const [analytics, setAnalytics] = useState({
    totalVotes: 0,
    totalVoters: 0,
    participationRate: 0,
    votingTrend: [],
    candidateResults: [],
    hourlyVotes: [],
  });
  const [loading, setLoading] = useState(true);

  const COLORS = ['#6366f1', '#c026d3', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  useEffect(() => {
    fetchAnalytics();
    // Refresh every 30 seconds
    const interval = setInterval(fetchAnalytics, 30000);
    return () => clearInterval(interval);
  }, [electionId]);

  const fetchAnalytics = async () => {
    try {
      // Simulated data - replace with actual API call
      const mockData = {
        totalVotes: 1247,
        totalVoters: 2500,
        participationRate: 49.88,
        votingTrend: [
          { time: '9 AM', votes: 45 },
          { time: '10 AM', votes: 89 },
          { time: '11 AM', votes: 134 },
          { time: '12 PM', votes: 178 },
          { time: '1 PM', votes: 245 },
          { time: '2 PM', votes: 312 },
          { time: '3 PM', votes: 389 },
          { time: '4 PM', votes: 456 },
          { time: '5 PM', votes: 534 },
        ],
        candidateResults: [
          { name: 'John Doe', votes: 487, percentage: 39.1 },
          { name: 'Jane Smith', votes: 423, percentage: 33.9 },
          { name: 'Bob Johnson', votes: 337, percentage: 27.0 },
        ],
        hourlyVotes: [
          { hour: '9-10', count: 45 },
          { hour: '10-11', count: 44 },
          { hour: '11-12', count: 45 },
          { hour: '12-1', count: 67 },
          { hour: '1-2', count: 67 },
          { hour: '2-3', count: 77 },
          { hour: '3-4', count: 67 },
          { hour: '4-5', count: 78 },
        ],
      };

      setAnalytics(mockData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Votes</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{analytics.totalVotes.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              <Vote className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-success-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>+12% from last hour</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Voters</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{analytics.totalVoters.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-accent-100 dark:bg-accent-900/30 rounded-lg">
              <Users className="h-6 w-6 text-accent-600 dark:text-accent-400" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Registered voters
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Participation</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{analytics.participationRate}%</p>
            </div>
            <div className="p-3 bg-success-100 dark:bg-success-900/30 rounded-lg">
              <Activity className="h-6 w-6 text-success-600 dark:text-success-400" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-success-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${analytics.participationRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg. Time</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">2.3m</p>
            </div>
            <div className="p-3 bg-warning-100 dark:bg-warning-900/30 rounded-lg">
              <Clock className="h-6 w-6 text-warning-600 dark:text-warning-400" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Per vote
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Voting Trend Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Voting Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.votingTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="votes"
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ fill: '#6366f1', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Candidate Results Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Candidate Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.candidateResults}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="votes"
              >
                {analytics.candidateResults.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hourly Votes Bar Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Hourly Voting Activity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analytics.hourlyVotes}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="hour" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Legend />
            <Bar dataKey="count" fill="#c026d3" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Candidate Leaderboard */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Candidate Leaderboard</h3>
        <div className="space-y-4">
          {analytics.candidateResults.map((candidate, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900 dark:text-white">{candidate.name}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {candidate.votes.toLocaleString()} votes ({candidate.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${candidate.percentage}%`,
                        backgroundColor: COLORS[index % COLORS.length],
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
