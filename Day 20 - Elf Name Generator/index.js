const elfFirstNames = [
  "Aurora", "Blitzen", "Crispin", "Dazzle", "Evergreen", "Frost", "Glimmer",
  "Holly", "Icicle", "Joyful", "Kringle", "Luna", "Merry", "Nutmeg",
  "Olwen", "Pine", "Quill", "Razzle", "Sparkle", "Tinsel", "Umbra",
  "Vixen", "Whisk", "Xylo", "Yule", "Zippy"
];

const elfLastNames = [
  "Applecheeks", "Bells", "Candycane", "Dazzlebright", "Everbright", "Frostwhisk",
  "Gingersnap", "Hollyberry", "Icestorm", "Jovial", "Kindleflame", "Lightwhisper",
  "Merrysprout", "Nutcracker", "Oakenleaf", "Peppermint", "Quicksilver", "Raindrop",
  "Snowdust", "Twinkletoes", "Underwood", "Velvet", "Winterberry", "Xylospark",
  "Yuletide", "Zestwind"
];


/*
 * 🎅 Task:
 * - Generate an elf first and last name that matches the user’s first and last name initials, then display it on the screen.
 * - Example: if the user’s name is "John Doe," the elf name could be "Joyful Dazzle."
 * - Display the generated elf names in the "Registered Employees" list.
 */

// Get DOM elements
const form = document.getElementById("form");
const generateBtn = document.getElementById("generate-btn");
const elfNameDisplay = document.getElementById("elf-name-display");
const elfNamesList = document.getElementById("elf-names-list");

// Function to generate an elf name
function generateElfName(firstName, lastName) {
  const firstInitial = firstName.trim().charAt(0).toUpperCase();
  const lastInitial = lastName.trim().charAt(0).toUpperCase();

  const firstIndex = firstInitial.charCodeAt(0) - 65; // 'A' = 65
  const lastIndex = lastInitial.charCodeAt(0) - 65;

  const elfFirstName = elfFirstNames[firstIndex % elfFirstNames.length] || "Mystic";
  const elfLastName = elfLastNames[lastIndex % elfLastNames.length] || "Whisper";

  return `${elfFirstName} ${elfLastName}`;
}

// Event listener for the generate button
generateBtn.addEventListener("click", () => {
  const firstName = form.elements["first-name"].value;
  const lastName = form.elements["last-name"].value;

  if (!firstName || !lastName) {
    alert("Please enter both a first and last name.");
    return;
  }

  const elfName = generateElfName(firstName, lastName);

  // Display the elf name
  elfNameDisplay.textContent = elfName;

  // Add to the registered employees list
  const listItem = document.createElement("li");
  listItem.textContent = elfName;
  elfNamesList.appendChild(listItem);
});

/*
 * 🌟 Stretch Goals:
 * - Generate the elf names using an LLM API (like HuggingFace). 
 * - Don't save the same name twice. (not necessary for the normal task)
 * - Make sure to use Scrimba's environment variables feature so you don't expose your API key 
 */ 
