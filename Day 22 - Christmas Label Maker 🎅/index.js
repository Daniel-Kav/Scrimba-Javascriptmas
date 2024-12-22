// import { addresses } from './addresses.js'
/*
Writing out labels by hand is a real pain. Luckily, you are so organised that you have all of your contacts saved in an array.

But not all of your contacts are on your Christmas list. So your task is this:

** Task ** 
1. Render a label for each entry in the address book, but only if isOnChistmasList is set to true! The label should contain the recipient's name and address.
2. Decorate the label with two festive icons from the icons folder. Use whatever colour scheme and layout you think looks good! 

** Stretch goals **
1. Ensure that the label does not get two of the same icon.
2. Create your own CSS Christmas logo to add a personal touch to each label.
*/

// const labelsContainer = document.querySelector('.labels-container')

import { addresses } from './addresses.js';

// Sample festive icons
const festiveIcons = ['🎄', '🎅', '❄️', '🦌', '🎁', '☃️'];

const labelsContainer = document.querySelector('.labels-container');

// Utility function to get two unique icons
const getUniqueIcons = (icons) => {
  const firstIconIndex = Math.floor(Math.random() * icons.length);
  let secondIconIndex;
  do {
    secondIconIndex = Math.floor(Math.random() * icons.length);
  } while (secondIconIndex === firstIconIndex);
  return [icons[firstIconIndex], icons[secondIconIndex]];
};

// Generate and render labels
addresses
  .filter((entry) => entry.isOnChristmasList) // Only include those on the Christmas list
  .forEach((entry) => {
    const label = document.createElement('div');
    label.className = 'label';

    // Add recipient details
    label.innerHTML = `
      <div class="label-header">
        <strong>${entry.name}</strong>
        <small>${entry.relation}</small>
      </div>
      <div class="label-body">
        <p>${entry['address line 1']}</p>
        <p>${entry.town}, ${entry.state}</p>
        <p>${entry.country}</p>
      </div>
    `;

    // Add festive icons
    const [icon1, icon2] = getUniqueIcons(festiveIcons);
    const iconContainer = document.createElement('div');
    iconContainer.className = 'icons';
    iconContainer.innerHTML = `<span>${icon1}</span><span>${icon2}</span>`;

    // Add a custom logo
    const logo = document.createElement('div');
    logo.className = 'logo';
    logo.textContent = '🎅 Merry Christmas 🎄';

    label.appendChild(iconContainer);
    label.appendChild(logo);

    labelsContainer.appendChild(label);
  });
