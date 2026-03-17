document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('schedule-container');
    const printBtn = document.getElementById('print-btn');
    
    // Set up print button
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }
    
    // Fallback data in case the file is opened locally without a web server (file:// protocol)
    const fallbackData = {
        "weekdays": [
            {
                "day": "Monday",
                "snack": "peanutbutter knäcke, fruit",
                "lunch": "avocado sandwich, nuts, dried fruit",
                "dinner": "Italian"
            },
            {
                "day": "Tuesday",
                "snack": "Rice cake, fruit",
                "lunch": "Eggs & cheese sandwich, cucumber",
                "dinner": "Pita or tortillas"
            },
            {
                "day": "Wednesday",
                "snack": "Muesli bar, fruit",
                "lunch": "wrap + meat (gyros), tomato",
                "dinner": "Curry or Thai or Indian"
            },
            {
                "day": "Thursday",
                "snack": "Pancake or waffle, fruit",
                "lunch": "Dumplings and sauce, yoghurt pot with fruit",
                "dinner": "Asian"
            },
            {
                "day": "Friday",
                "snack": "Smoothie",
                "lunch": "Avocado sandwich, nuts, dried fruit",
                "dinner": "Fish & chips or pizza or burger"
            }
        ]
    };

    /**
     * Renders the schedule data into the DOM
     */
    function renderSchedule(data) {
        container.innerHTML = ''; // Clear loading
        
        data.weekdays.forEach((dayData, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            // Staggered animation
            card.style.animationDelay = `${index * 0.15}s`;
            
            card.innerHTML = `
                <div class="card-header">
                    <h2>${dayData.day}</h2>
                    <div class="day-initial">${dayData.day.charAt(0)}</div>
                </div>
                
                <div class="meal-section">
                    <div class="meal-title snack-title">
                        <i data-lucide="apple"></i> Snack
                    </div>
                    <div class="meal-content">${dayData.snack}</div>
                </div>
                
                <div class="meal-section">
                    <div class="meal-title lunch-title">
                        <i data-lucide="sandwich"></i> Lunch
                    </div>
                    <div class="meal-content">${dayData.lunch}</div>
                </div>
                
                <div class="meal-section">
                    <div class="meal-title dinner-title">
                        <i data-lucide="utensils"></i> Dinner
                    </div>
                    <div class="meal-content">${dayData.dinner}</div>
                </div>
            `;
            
            container.appendChild(card);
        });
        
        // Initialize Lucide icons on newly created elements
        lucide.createIcons();
    }

    // Try fetching the dynamic JSON file first
    try {
        const response = await fetch('weekdays.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        renderSchedule(data);
        
    } catch (error) {
        console.warn('Could not fetch weekdays.json (likely running via file://). Using fallback data.', error);
        
        // Add a small delay to simulate loading for a premium feel
        setTimeout(() => {
            renderSchedule(fallbackData);
        }, 800);
    }
});
