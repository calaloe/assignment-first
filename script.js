// Store assignments in memory
let assignments = [];

// Scoring constants
const SCORES = {
    deadline: {
        veryUrgent: 3,  // 0-2 days
        urgent: 2.5,    // 3-7 days
        normal: 2,      // 8-14 days
        relaxed: 1      // 15+ days
    },
    difficulty: {
        Easy: 1,
        Medium: 2,
        Hard: 3
    },
    workAmount: {
        Small: 1,
        Medium: 2,
        Large: 3
    }
};

// DOM Elements
const form = document.getElementById('assignmentForm');
const errorMessage = document.getElementById('errorMessage');
const resultsSection = document.getElementById('resultsSection');
const emptyState = document.getElementById('emptyState');
const assignmentsList = document.getElementById('assignmentsList');

// Form submission
form.addEventListener('submit', handleAddAssignment);

// Calculate days until deadline
function daysUntilDeadline(dateString) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const deadline = new Date(dateString);
    deadline.setHours(0, 0, 0, 0);
    
    const timeDiff = deadline - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
    return daysDiff;
}

// Get deadline score based on days until deadline
function getDeadlineScore(dateString) {
    const daysLeft = daysUntilDeadline(dateString);
    
    if (daysLeft <= 2) {
        return SCORES.deadline.veryUrgent;
    } else if (daysLeft <= 7) {
        return SCORES.deadline.urgent;
    } else if (daysLeft <= 14) {
        return SCORES.deadline.normal;
    } else {
        return SCORES.deadline.relaxed;
    }
}

// Get difficulty score
function getDifficultyScore(difficulty) {
    return SCORES.difficulty[difficulty] || 0;
}

// Get work amount score
function getWorkScore(workAmount) {
    return SCORES.workAmount[workAmount] || 0;
}

// Calculate total score for an assignment
function calculateScore(assignment) {
    const deadlineScore = getDeadlineScore(assignment.dueDate);
    const difficultyScore = getDifficultyScore(assignment.difficulty);
    const workScore = getWorkScore(assignment.workAmount);
    
    const totalScore = deadlineScore + difficultyScore + workScore;
    
    return {
        total: totalScore,
        deadline: deadlineScore,
        difficulty: difficultyScore,
        work: workScore
    };
}

// Get deadline urgency label
function getDeadlineUrgency(dateString) {
    const daysLeft = daysUntilDeadline(dateString);
    
    if (daysLeft <= 2) {
        return 'Very Urgent (0-2 days)';
    } else if (daysLeft <= 7) {
        return 'Urgent (3-7 days)';
    } else if (daysLeft <= 14) {
        return 'Normal (8-14 days)';
    } else {
        return 'Relaxed (15+ days)';
    }
}

// Validate form inputs
function validateForm() {
    const name = document.getElementById('assignmentName').value.trim();
    const dueDate = document.getElementById('dueDate').value;
    const difficulty = document.getElementById('difficulty').value;
    const workAmount = document.getElementById('workAmount').value;
    
    if (!name) {
        showError('Please enter an assignment name.');
        return false;
    }
    
    if (!dueDate) {
        showError('Please select a due date.');
        return false;
    }
    
    // Check if date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(dueDate);
    deadline.setHours(0, 0, 0, 0);
    
    if (deadline < today) {
        showError('Please select a due date in the future.');
        return false;
    }
    
    if (!difficulty) {
        showError('Please select a difficulty level.');
        return false;
    }
    
    if (!workAmount) {
        showError('Please select an amount of work.');
        return false;
    }
    
    return true;
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
}

// Clear error message
function clearError() {
    errorMessage.textContent = '';
    errorMessage.classList.remove('show');
}

// Handle adding assignment
function handleAddAssignment(e) {
    e.preventDefault();
    clearError();
    
    if (!validateForm()) {
        return;
    }
    
    const name = document.getElementById('assignmentName').value.trim();
    const dueDate = document.getElementById('dueDate').value;
    const difficulty = document.getElementById('difficulty').value;
    const workAmount = document.getElementById('workAmount').value;
    
    // Add assignment to array
    const assignment = {
        id: Date.now(),
        name,
        dueDate,
        difficulty,
        workAmount
    };
    
    assignments.push(assignment);
    
    // Clear form
    form.reset();
    
    // Update display
    updateDisplay();
}

// Sort assignments by score and deadline
function getSortedAssignments() {
    return assignments
        .map(assignment => ({
            ...assignment,
            scores: calculateScore(assignment)
        }))
        .sort((a, b) => {
            // Sort by total score (descending - higher score first)
            if (a.scores.total !== b.scores.total) {
                return b.scores.total - a.scores.total;
            }
            // If tied, sort by deadline (earlier deadline first)
            const aDaysLeft = daysUntilDeadline(a.dueDate);
            const bDaysLeft = daysUntilDeadline(b.dueDate);
            return aDaysLeft - bDaysLeft;
        });
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Create assignment card HTML
function createAssignmentCard(assignment, index, isFirst) {
    const daysLeft = daysUntilDeadline(assignment.dueDate);
    const urgency = getDeadlineUrgency(assignment.dueDate);
    
    const rankLabel = isFirst 
        ? '🎯 START HERE' 
        : `#${index + 1}`;
    
    return `
        <div class="assignment-card ${isFirst ? 'first' : ''}">
            <div class="rank-badge ${isFirst ? 'first' : ''}">
                ${rankLabel}
            </div>
            
            <div class="assignment-name">${escapeHtml(assignment.name)}</div>
            
            <div class="assignment-details">
                <div class="detail-item">
                    <span class="detail-label">Due Date</span>
                    <span class="detail-value">${formatDate(assignment.dueDate)}</span>
                    <span class="detail-label" style="font-size: 0.75rem; margin-top: 4px;">${urgency}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Days Left</span>
                    <span class="detail-value">${daysLeft} day${daysLeft !== 1 ? 's' : ''}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Difficulty</span>
                    <span class="detail-value">${assignment.difficulty}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Amount of Work</span>
                    <span class="detail-value">${assignment.workAmount}</span>
                </div>
            </div>
            
            <div class="score-breakdown">
                <strong>Score Breakdown:</strong><br>
                Deadline: ${assignment.scores.deadline.toFixed(1)} + 
                Difficulty: ${assignment.scores.difficulty.toFixed(1)} + 
                Work: ${assignment.scores.work.toFixed(1)} = 
                <strong>${assignment.scores.total.toFixed(1)}</strong>
            </div>
        </div>
    `;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Update display with sorted assignments
function updateDisplay() {
    if (assignments.length === 0) {
        resultsSection.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    resultsSection.style.display = 'block';
    
    const sorted = getSortedAssignments();
    assignmentsList.innerHTML = sorted
        .map((assignment, index) => createAssignmentCard(assignment, index, index === 0))
        .join('');
}

// Initialize display
updateDisplay();
