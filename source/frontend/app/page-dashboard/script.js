/** This file creates, opens, and closes the sidebar in the dashboard
 *  Credit to: w3schools for a demo on this functionality
*/
// Buttons to open/close sidebar
const sideBar = document.querySelector('side-bar');
console.log(sideBar);
const docBar = document.querySelector('[class = "sidebar"]');
const sideBarOpener = document.getElementById('openbtn');
const sideBarCloser = sideBar.shadowRoot.getElementById('closebtn');
console.log(sideBarCloser);

// Open sidebar when you click this button
sideBarOpener.addEventListener('click', function() {
  openSidebar();
});

// Close sidebar when you click this button
sideBarCloser.addEventListener('click', function() {
  closeSidebar();
});

/** Visually opens the sidebar
 * @return null
 */
function openSidebar() {
  docBar.style.width = '250px';
  document.getElementById('main').style.marginLeft = '250px';
}

/** Visually closes the sidebar
 * @return null
 */
function closeSidebar() {
  docBar.style.width = '0';
  document.getElementById('main').style.marginLeft = '0';
}
