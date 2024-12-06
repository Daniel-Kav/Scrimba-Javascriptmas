/* 
This Christmas, you’ve been tasked with running an anagram quiz at 
the family gathering.

You have been given a list of anagrams, but you suspect that some 
of the anagram pairs might be incorrect.

Your job is to write a JavaScript function to loop through the array
and filter out any pairs that aren’t actually anagrams.

For this challenge, spaces will be ignored, so "Be The Helm" would 
be considered a valid anagram of "Bethlehem".
*/ 

let anagrams = [
    ["Can Assault", "Santa Claus"],
    ["Refreshed Erudite Londoner", "Rudolf the Red Nose Reindeer"],
    ["Frosty The Snowman", "Honesty Warms Front"],
    ["Drastic Charms", "Christmas Cards"],
    ["Congress Liar", "Carol Singers"],
    ["The Tin Glints", "Silent Night"],
    ["Be The Helm", "Bethlehem"],
    ["Is Car Thieves", "Christmas Eve"]
];

function findAnagrams(array){
    // write your code here

    // Helper function to count character frequencies in a string 
    const charCount = (str) => {
        let count = {};
        for (let char of str.replace(/\s+/g,'').toLowerCase()) {
            count[char] = (count[char] || 0) + 1;
        }
        return count
    }

    // check if  the two strings are anagrams by comparing thier char counts 
    const isAnagram = (s1,s2) => {
        const count1 = charCount(s1)
        const count2 = charCount(s2)

        if (Object.keys(count1).length !== Object.keys(count2).length) {
            return false
        }

        for (let char in count1) {
            if (count1[char] !== count2[char]) {
                return false
            }
        }
        return true
    }

    // #filter valid anagrams pairs 
    return array.filter( pair => {
        const [s1,s2] = pair;  // destructure the pair
        return isAnagram(s1,s2)
    })
}
const validAnagrams = findAnagrams(anagrams)






 