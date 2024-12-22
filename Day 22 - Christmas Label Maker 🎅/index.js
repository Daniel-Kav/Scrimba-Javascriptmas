import { addresses } from './addresses.js';

const labelsContainer = document.querySelector('.labels-container');

// Utility function to get two unique random icons
const getUniqueIcons = (icons) => {
  const firstIconIndex = Math.floor(Math.random() * icons.length);
  let secondIconIndex;
  do {
    secondIconIndex = Math.floor(Math.random() * icons.length);
  } while (secondIconIndex === firstIconIndex);
  return [icons[firstIconIndex], icons[secondIconIndex]];
};

// Array of available festive icons (paths to your images)
const festiveIcons = [
  './icons/gingerbread-man.png',
  './icons/snowman.png',
  './icons/tree.png',
  './icons/star.png',
  './icons/santa.png',
  './icons/snowflake.png',
];

// Generate and render labels dynamically
addresses
  .filter((entry) => entry.isOnChristmasList) // Only include those on the Christmas list
  .forEach((entry) => {
    // Create the main label container
    const label = document.createElement('div');
    label.className = 'label';

    // Add festive icons at the top
    const [icon1, icon2] = getUniqueIcons(festiveIcons);
    const topIconContainer = document.createElement('div');
    topIconContainer.className = 'icons';
    topIconContainer.innerHTML = `
      <img src="${icon1}" alt="Festive Icon 1" class="icon" />
      <img src="${icon2}" alt="Festive Icon 2" class="icon" />
    `;

    // Add recipient details (header and body)
    const labelHeader = `
      <div class="label-header">
        <strong>${entry.name}</strong>
        <small>${entry.relation}</small>
      </div>
      <div class="label-body">
        <p>${entry['address line 1']}</p>
        <p>${entry.town}</p>
        <p>${entry.state}</p>
        <p>${entry.country}</p>
      </div>
    `;

    // Add festive icons at the bottom
    const [icon3, icon4] = getUniqueIcons(festiveIcons);
    const bottomIconContainer = document.createElement('div');
    bottomIconContainer.className = 'icons';
    bottomIconContainer.innerHTML = `
      <img src="${icon3}" alt="Festive Icon 3" class="icon" />
      <img src="${icon4}" alt="Festive Icon 4" class="icon" />
    `;

    // Add the custom Christmas logo
    const logo = document.createElement('div');
    logo.className = 'logo';
    logo.textContent = '🎅 Merry Christmas 🎄';

    // Append all parts to the label
    label.appendChild(topIconContainer);
    label.innerHTML += labelHeader;
    label.appendChild(bottomIconContainer);
    label.appendChild(logo);

    // Append the label to the container
    labelsContainer.appendChild(label);
  });
