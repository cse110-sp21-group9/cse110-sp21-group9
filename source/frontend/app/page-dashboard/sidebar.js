/** This file opens and closes the sidebar in the dashboard
 *  Credit to: w3schools for a demo on this functionality
*/

// Buttons to open/close sidebar
const sideBarOpener = document.getElementById('openbtn')
const sideBarCloser = document.getElementById('closebtn')

// Open sidebar when you click this button
sideBarOpener.addEventListener('click', function () {
  openSidebar()
})

// Close sidebar when you click this button
sideBarCloser.addEventListener('click', function () {
  closeSidebar()
})

/** Visually opens the sidebar
 * @return null
 */
function openSidebar () {
  document.getElementById('mySidebar').style.width = '250px'
  document.getElementById('main').style.marginLeft = '250px'
}

/** Visually closes the sidebar
 * @return null
 */
function closeSidebar () {
  document.getElementById('mySidebar').style.width = '0'
  document.getElementById('main').style.marginLeft = '0'
}
