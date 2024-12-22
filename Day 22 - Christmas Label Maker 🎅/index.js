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

const labelsContainer = document.querySelector('.labels-container');

// Array of icon file names
const festiveIcons = [
  'bauble.png', 'bow.png', 'candy-cane.png', 'deer.png', 
  'gifts.png', 'gingerbread-man.png', 'santa-hat.png', 
  'santa.png', 'snowflake.png', 'snowglobe.png', 
  'snowman.png', 'star-bauble.png', 'star.png', 
  'stocking.png', 'tree.png', 'trees.png', 'wreath.png'
];

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

    // Create <img> elements for the icons
    const icon1Img = document.createElement('img');
    icon1Img.src = `./icons/${icon1}`;
    icon1Img.alt = icon1.replace('.png', '');
    icon1Img.className = 'icon';

    const icon2Img = document.createElement('img');
    icon2Img.src = `./icons/${icon2}`;
    icon2Img.alt = icon2.replace('.png', '');
    icon2Img.className = 'icon';

    iconContainer.appendChild(icon1Img);
    iconContainer.appendChild(icon2Img);

    // Add a custom logo
    const logo = document.createElement('div');
    logo.className = 'logo';
    logo.textContent = '🎅 Merry Christmas 🎄';

    label.appendChild(iconContainer);
    label.appendChild(logo);

    labelsContainer.appendChild(label);
  });
