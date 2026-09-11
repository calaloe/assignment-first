# Assignment First

A simple, clean, mobile-friendly web app to help university and college students prioritize their assignments.

## Problem Solved

University students often struggle to decide which assignment to start first. This app helps by analyzing assignment deadlines, difficulty, and workload to recommend the optimal order.

## Features

✅ **Add Assignments** — Enter assignment name, due date, difficulty level, and amount of work  
✅ **Smart Ranking** — Assignments are ranked by deadline, difficulty, and workload (equal weight)  
✅ **Clear Recommendations** — See which assignment to start first with a visual highlight  
✅ **Score Breakdown** — Understand exactly how each assignment was ranked  
✅ **Mobile-Friendly** — Clean design that works on phones, tablets, and desktops  
✅ **Simple Error Handling** — Clear messages if required information is missing  

## How It Works

### Scoring System

Each assignment receives a score based on three factors:

1. **Deadline** (0-3 points)
   - Very Urgent (0-2 days): 3 points
   - Urgent (3-7 days): 2.5 points
   - Normal (8-14 days): 2 points
   - Relaxed (15+ days): 1 point

2. **Difficulty** (1-3 points)
   - Easy: 1 point
   - Medium: 2 points
   - Hard: 3 points

3. **Amount of Work** (1-3 points)
   - Small: 1 point
   - Medium: 2 points
   - Large: 3 points

**Total Score = Deadline Score + Difficulty Score + Work Score**

Assignments with higher scores should be started first. If two assignments have the same score, the one with the earlier deadline takes priority.

### Example

| Assignment | Deadline | Days Left | Difficulty | Work | Deadline Score | Difficulty Score | Work Score | **Total** |
|---|---|---|---|---|---|---|---|---|
| History Essay | Oct 15 | 4 days | Hard | Large | 2.5 | 3 | 3 | **8.5** ⭐ Start here |
| Math Problem Set | Oct 18 | 7 days | Easy | Small | 2.5 | 1 | 1 | **4.5** |
| Biology Project | Oct 25 | 14 days | Medium | Large | 2 | 2 | 3 | **7** |

The History Essay has the highest score and should be started first.

## User Inputs

For each assignment, enter:

1. **Assignment Name** — Title or description (e.g., "History Essay")
2. **Due Date** — Exact date assignment is due
3. **Difficulty** — Easy, Medium, or Hard
4. **Amount of Work** — Small, Medium, or Large

## Getting Started

### Open in Browser

Simply open `index.html` in any web browser. No installation or setup required.

### Files

- `index.html` — HTML structure and form
- `styles.css` — Mobile-friendly styling
- `script.js` — Scoring logic and assignment management
- `README.md` — This file

## Usage

1. **Add an Assignment**
   - Fill in the assignment name
   - Select the due date
   - Choose the difficulty level
   - Select the amount of work
   - Click "Add Assignment"

2. **View Recommendations**
   - Assignments appear in recommended order
   - The first assignment (highlighted in blue) is what to start with
   - Each card shows:
     - Assignment name and rank
     - Due date and days remaining
     - Difficulty and workload
     - Score breakdown explaining the ranking

3. **Add More Assignments**
   - The list updates automatically as you add more
   - The ranking changes based on all assignments

## Design Principles

- **Simple & Clean** — No unnecessary features or clutter
- **Mobile-First** — Works perfectly on phones and small screens
- **Clear Labeling** — All inputs and results are easy to understand
- **Visual Hierarchy** — The recommended first assignment stands out
- **Transparent Ranking** — Score calculations are shown, not hidden
- **Error Prevention** — Validates inputs and prevents past dates

## Technical Details

- **Pure JavaScript** — No frameworks or dependencies
- **Client-Side Only** — No server, database, or login required
- **Responsive Design** — CSS Grid and Flexbox for mobile adaptation
- **XSS Protection** — HTML input is escaped to prevent injection

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## What's NOT Included

This is a simple prototype. The following features are intentionally excluded:

- ❌ User accounts or login
- ❌ Passwords or authentication
- ❌ Payments or subscriptions
- ❌ Database or data persistence
- ❌ Notifications or reminders
- ❌ Calendar integration
- ❌ Progress tracking
- ❌ Social features
- ❌ AI or machine learning
- ❌ Complex animations
- ❌ External services

## Future Enhancements (Optional)

If you'd like to expand this prototype:

- Add local storage to save assignments between sessions
- Export/download assignment list as PDF or CSV
- Estimate time to complete each assignment
- Track completed assignments
- Color-code by subject or category
- Add custom priority weighting

## License

This project is open source and free to use.

## Questions?

This is a simple tool to help students prioritize. Start with one assignment at a time, follow the recommendation, and work through your list.

Good luck with your studies! 📚
