// import { toysRequested } from './data.js'

/*
The run up to Christmas is quite a data-intensive time for Santa. In order to understand market trends, Santa's Data Elves have collated sample children’s wish list data from 4 locations and now need to know which was the most popular toy requested overall. This will help with procurement for next year. 

**Task**
- Your task is to find the most requested toy from the array of objects “toysRequested”. But remember: some toys appear in more than one location!

Expected output: "The most popular toy is 🎲 board games with 9000 requests.""

**Stretch Goal**
- Complete this challenge using the .flatMap() method to work with the various "toys" arrays.

*/ 

import { toysRequested } from './data.js';

// Calculate the most popular toy
function findMostPopularToy(toysRequested) {
  // Aggregate all toys into a single array of { name, count }
  const allToys = toysRequested.flatMap(location =>
    location.toys.map(toy => {
      const [name, count] = Object.entries(toy)[0]; // Extract name and count from toy object
      return { name, count };
    })
  );

  // Use a Map to calculate total requests for each toy
  const toyCounts = new Map();
  for (const { name, count } of allToys) {
    toyCounts.set(name, (toyCounts.get(name) || 0) + count);
  }

  // Find the toy with the highest count
  let mostPopularToy = '';
  let maxCount = 0;

  for (const [name, count] of toyCounts) {
    if (count > maxCount) {
      mostPopularToy = name;
      maxCount = count;
    }
  }

  return { mostPopularToy, maxCount };
}

// Get the result
const { mostPopularToy, maxCount } = findMostPopularToy(toysRequested);

// Output the result
console.log(`The most popular toy is ${mostPopularToy} with ${maxCount} requests.`);
