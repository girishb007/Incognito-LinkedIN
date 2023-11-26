const applescript = require('applescript');

// AppleScript code to open the ellipses menu in Chrome
const openEllipsesMenuScript = `
tell application "Google Chrome"
  activate
  delay 1
  tell application "System Events" to keystroke "p" using {command down}
  delay 1
end tell
`;

// Execute the AppleScript code
applescript.execString(openEllipsesMenuScript, (err) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Ellipses menu opened in Chrome.');
  }
});
