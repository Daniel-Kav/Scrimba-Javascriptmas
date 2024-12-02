const calendarContainer = document.getElementById('calendar');

// List of chocolates to display as gifts
const chocolates = [
  "Milk Chocolate",
  "Dark Chocolate",
  "White Chocolate",
  "Hazelnut Praline",
  "Truffle",
  "Caramel Chocolate",
  "Peanut Butter Cup",
  "Mint Chocolate",
  "Orange Chocolate",
  "Almond Chocolate",
  "Coconut Chocolate",
  "Raspberry Truffle",
];

// Load opened days from localStorage
let openedDays = JSON.parse(localStorage.getItem('openedDays')) || {};

// Function to create a calendar box
for (let i = 1; i <= 24; i++) {
  const box = document.createElement('li');
  box.classList.add('calendar-box');
  
  const number = document.createElement('p');
  number.innerHTML = i;
  
  const icon = document.createElement('i');
  icon.classList.add('fas', 'fa-gift');

  const description = document.createElement('p');
  description.innerHTML = "Open me!";
  
  box.appendChild(number);
  box.appendChild(icon);
  box.appendChild(description);
  calendarContainer.appendChild(box);

  // Check if the day is already opened
  if (openedDays[i]) {
    description.innerHTML = openedDays[i];
    icon.classList.remove('fa-gift');
    icon.classList.add('fa-check'); // Change icon for opened days
    box.classList.add('opened');   // Add opened class for styling
  }

  // Add click event listener
  box.addEventListener('click', () => {
    if (!openedDays[i]) {
      // Generate a random chocolate gift
      const gift = chocolates[Math.floor(Math.random() * chocolates.length)];
      
      // Update the box content
      description.innerHTML = gift;
      icon.classList.remove('fa-gift');
      icon.classList.add('fa-check');
      box.classList.add('opened');

      // Save to localStorage
      openedDays[i] = gift;
      localStorage.setItem('openedDays', JSON.stringify(openedDays));
    } else {
      alert(`Day ${i} is already opened. You received: ${openedDays[i]}`);
    }
  });
}
