/*
The cool people of Lapland are bored of traditional social media and have decided to build their own app called Northagram...and they need your help!

This is how the app should work:
- It displays circular avatars of the friends who have uploaded pictures lately. These avatars have a white border.
- Underneath, it cycles through the friends' pictures displaying each for 1.5 seconds. (There's an animated snowman loading state before pictures load.)
- While a friend's pictures are being displayed, that friend's avatar gets a red border.
- This red border reverts to white when their pictures have finished being displayed.
- When all of the images have been displayed, the user should see a message "Refresh to load latest images". All avatars should have a white border at this point.

Stretch Goals for dedicated Social Media Engineers

- Add captions to the images.
- Refactor your code to use generators!
- Grey out the avatar after that friend's pictures have been displayed.
- Make it so clicking on an image pauses the timer.
- Add left and right arrow overlays to the image so users can scroll back and forth.
*/

import { feedData } from './data.js'

// Get DOM elements
const avatarsSection = document.querySelector('.feed-avatars')
const imagesSection = document.querySelector('.feed-images')

// Render all avatars initially
function renderAvatars() {
    avatarsSection.innerHTML = feedData.map(friend => `
        <img class="avatar" 
             src="${friend.avatarUrl}" 
             alt="${friend.handle}'s avatar"
             data-handle="${friend.handle}"
        >
    `).join('')
}

// Render single image with loading state removed
function renderImage(imageData) {
    imagesSection.innerHTML = `
        <img class="feature-image" 
             src="${imageData.imageUrl}" 
             alt="${imageData.alt}"
        >
    `
}

// Handle avatar highlighting
function renderAvatarHighlight(handle, highlight = true) {
    const avatar = document.querySelector(`[data-handle="${handle}"]`)
    if (highlight) {
        avatar.classList.add('highlight')
    } else {
        avatar.classList.remove('highlight')
    }
}

// Main timer control function
async function handleTimer() {
    // Remove loading state
    imagesSection.innerHTML = ''
    
    // Loop through each friend
    for (const friend of feedData) {
        renderAvatarHighlight(friend.handle, true)
        
        // Loop through friend's images
        for (const image of friend.features) {
            renderImage(image)
            await new Promise(resolve => setTimeout(resolve, 1500))
        }
        
        renderAvatarHighlight(friend.handle, false)
    }
    
    // Show end message
    imagesSection.innerHTML = `
        <p class="ux-message">Refresh to load latest images</p>
    `
}

// Initialize the app
renderAvatars()
handleTimer()