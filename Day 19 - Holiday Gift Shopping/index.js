import shoppingList from "./shoppingList.js";
/*
    You're shopping for holiday gifts, but money is tight
    so we need to consider the cheapest items first.
    Use JavaScript's built-in array sort() (or toSorted()) method to
    write a function that returns an array of products sorted 
    by price, cheapest to most expensive. 
    
    Log the sorted array to the console to double-check you
    solved it correctly.
*/

function sortProducts(list){
    
    return list.sort((a, b) => a.price - b.price);
}

const listByCheapest = sortProducts(shoppingList);


/**
 * Stretch goals:
 * 
 * 1. Log the items to the console in a more formatted way, 
 *    like this (one item per line):
 * 
 *    💕: $0
 *    🍬: $0.49
 *    🍫: $0.99
 *    🍭: $1.99
 *    🧁: $2.99
 *    ...etc.
 * 
 * 2. Create a UI for this by displaying the unsorted items first, then
 *    having a button that will sort the items on the page by price.
 */

// Log the sorted list to the console

// Log the sorted list in a formatted way
function logFormattedList(list) {
    list.forEach(item => {
        console.log(`${item.product}: $${item.price}`);
    });
}



// Log sorted list to the console (formatted)
console.log("Sorted Products:");
logFormattedList(sortProducts([...shoppingList]));