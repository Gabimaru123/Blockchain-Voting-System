# 🚀 Quick Reference - New Features

## ⚡ Quick Start

```bash
# Install dependencies (already done)
cd frontend && npm install recharts socket.io-client --legacy-peer-deps
cd ../backend && npm install socket.io

# Start servers
cd backend && npm run dev    # Terminal 1
cd frontend && npm start     # Terminal 2
```

---

## 🌙 Dark Mode

**Location:** Navbar (top right)  
**Icon:** Sun/Moon  
**Storage:** localStorage

```jsx
// Use in components
import { useTheme } from '../contexts/ThemeContext';

const { isDarkMode, toggleTheme } = useTheme();
```

---

## 📋 Election Templates

**8 Templates Available:**
- Presidential 🏛️
- Parliamentary 🏢
- Local 🏘️
- Organizational 🏢
- Referendum 📊
- Student 🎓
- Community 👥
- Custom ⚙️

```jsx
import TemplateSelector from '../components/admin/TemplateSelector';

<TemplateSelector
  onSelectTemplate={(template) => console.log(template)}
  onClose={() => setShow(false)}
/>
```

---

## 📊 Analytics Dashboard

**Shows:**
- Total votes, voters, participation
- Voting trend line chart
- Candidate pie chart
- Hourly bar chart
- Live leaderboard

```jsx
import AnalyticsDashboard from '../components/analytics/AnalyticsDashboard';

<AnalyticsDashboard electionId="123" />
```

---

## 📡 Live Results

**Features:**
- Real-time updates via WebSocket
- Recent votes ticker
- Animated progress bars
- Leading indicator

```jsx
import LiveResults from '../components/results/LiveResults';

<LiveResults 
  electionId="123" 
  initialResults={results}
/>
```

**Backend - Emit votes:**
```javascript
import { emitNewVote } from './socket.js';

emitNewVote(electionId, {
  candidateId: '1',
  candidateName: 'John Doe'
});
```

---

## 📁 File Structure

```
New Files:
├── frontend/src/
│   ├── contexts/
│   │   ├── ThemeContext.js
│   │   └── SocketContext.js
│   ├── components/
│   │   ├── common/ThemeToggle.js
│   │   ├── admin/TemplateSelector.js
│   │   ├── analytics/AnalyticsDashboard.js
│   │   └── results/LiveResults.js
│   └── utils/electionTemplates.js
└── backend/
    └── socket.js
```

---

## 🎨 Dark Mode Classes

```jsx
// Backgrounds
bg-white dark:bg-gray-800

// Text
text-gray-900 dark:text-gray-100

// Borders
border-gray-200 dark:border-gray-700

// Cards
bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-900
```

---

## 🐛 Troubleshooting

**Dark mode not working?**
- Check ThemeProvider in App.js
- Verify `darkMode: 'class'` in tailwind.config.js

**Socket not connecting?**
- Check backend is running
- Verify FRONTEND_URL in backend .env
- Check browser console for errors

**Charts not showing?**
- Verify recharts is installed
- Check data format matches component props

---

## 📊 Component Props

### AnalyticsDashboard
```typescript
electionId: string (required)
```

### LiveResults
```typescript
electionId: string (required)
initialResults: Array<{
  id: string,
  name: string,
  party?: string,
  votes: number
}> (optional)
```

### TemplateSelector
```typescript
onSelectTemplate: (template) => void (required)
onClose: () => void (required)
```

---

## ✅ Testing Checklist

- [ ] Dark mode toggles correctly
- [ ] Theme persists on refresh
- [ ] Templates load in modal
- [ ] Template selection fills form
- [ ] Analytics charts render
- [ ] Live results connect
- [ ] Vote updates appear in real-time
- [ ] Recent votes ticker works

---

## 🎯 Integration Points

### Add to Results Page
```jsx
import LiveResults from '../components/results/LiveResults';

// In your Results component
<LiveResults electionId={id} initialResults={results} />
```

### Add to Admin Dashboard
```jsx
import AnalyticsDashboard from '../components/analytics/AnalyticsDashboard';

// In your admin component
<AnalyticsDashboard electionId={id} />
```

### Add to Create Election
```jsx
import TemplateSelector from '../components/admin/TemplateSelector';

// Add button
<button onClick={() => setShowTemplates(true)}>
  Choose Template
</button>

// Add modal
{showTemplates && (
  <TemplateSelector
    onSelectTemplate={handleSelectTemplate}
    onClose={() => setShowTemplates(false)}
  />
)}
```

---

**All features are ready to use! 🎉**
