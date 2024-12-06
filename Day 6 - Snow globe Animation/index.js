const snowGlobe = document.querySelector('.snow-globe')
let snowflakeCount = 0;

function createSnowflake() {
    // Create snowflake element
    const snowflake = document.createElement('div');
    snowflakeCount++;
    
    // Determine if it should be a snowman (every 25th snowflake)
    const isSnowman = snowflakeCount % 25 === 0;
    snowflake.textContent = isSnowman ? '☃️' : '❄️';
    snowflake.classList.add('snowflake');
    
    // Random starting position (within snow globe width)
    const startPosition = Math.random() * 340; // 380px - some padding
    snowflake.style.left = startPosition + 'px';
    
    // Random size between 15px and 30px
    const size = Math.random() * 15 + 15;
    snowflake.style.fontSize = size + 'px';
    
    // Random animation duration between 3s and 6s
    const duration = Math.random() * 3 + 3;
    snowflake.style.animationDuration = duration + 's';
    
    // Random horizontal drift (-20px to 20px)
    const drift = Math.random() * 40 - 20;
    snowflake.style.setProperty('--drift', drift + 'px');
    
    // Add snowflake to snow globe
    snowGlobe.appendChild(snowflake);
    
    // Remove snowflake after animation completes
    setTimeout(() => {
        snowflake.remove();
    }, duration * 1000);
}

// Create snowflakes every 100ms
let snowInterval = setInterval(createSnowflake, 100);

// Add button to control snow
const button = document.createElement('button');
button.textContent = 'Toggle Snow';
button.style.margin = '20px';
document.body.appendChild(button);

let isSnowing = true;
button.addEventListener('click', () => {
    if (isSnowing) {
        // Gradually slow down and stop snow
        let interval = 100;
        const slowDown = setInterval(() => {
            interval += 50;
            clearInterval(snowInterval);
            snowInterval = setInterval(createSnowflake, interval);
            if (interval > 1000) {
                clearInterval(snowInterval);
                clearInterval(slowDown);
            }
        }, 500);
    } else {
        // Start snow again
        snowInterval = setInterval(createSnowflake, 100);
        snowGlobe.classList.add('shake');
        setTimeout(() => {
            snowGlobe.classList.remove('shake');
        }, 500);
    }
    isSnowing = !isSnowing;
});

/* Stretch goals: 
- Give some variety to your snowflakes, so they are not all the same. Perhaps every 25th one could be a snowman ☃️?
- Remove each snowflake after a set time - this will stop the scene from being lost in a blizzard!
- Add a button that makes the snow start falling, it could trigger a CSS-animated shake of the snow globe. Then make the snow become less frequent until it slowly stops - until the button is pressed again.  
- Change the direction of the snowflakes so they don't all fall vertically.
- Make the style your own! 
*/