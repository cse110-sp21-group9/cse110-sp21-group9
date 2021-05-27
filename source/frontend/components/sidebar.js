/** This file implements a <side-bar> custom web component
 *  Credit to: w3Schools for a demo on this functionality
 *  TODO: Write instructions for how to use this thing
 *
 *  How to use use this :
 *  In your html file:
 *  Paste this in your <head>
 *  <script type = "module" src = "../../components/sidebar.js"></script>
    <script type = "module" src = "../../components/script.js"></script>
 *  Paste this in your <body>
    <div class="sidebar">
    <side-bar></side-bar>
    </div>
    <div id= "main">
    <header>
      <div id = "openbtn" class = "hamburger" style = "display: inline-block">
        <div class = "hamburger-bar"></div>
        <div class = "hamburger-bar"></div>
        <div class = "hamburger-bar"></div>
      </div>
    </header>
 *  Make sure to wrap the rest of your website under the 'main' div
 *  In your css file:
 *  .sidebar {
      height: 100%;
      width: 0;
      position: fixed;
      z-index: 1;
      top: 0;
      left: 0;
      background-color: rgb(227, 229, 240);
      overflow-x: hidden;
      padding-top: 60px;
      transition: 0.5s;
      overflow: hidden;
    }
 *  #main {
      transition: margin-left .5s;
      padding: 20px;
      width: 95%;
      height: 100vh;
    }
    .hamburger-bar {
      width: 35px;
      height: 5px;
      background-color: black;
      margin: 6px 0;
    }
    .hamburger:hover {
      background-color: rgb(255, 255, 255);
}
*/

class sidebar extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');

    template.innerHTML = `
    <style>
    .sidebar a {
      padding: 8px 8px 8px 8px;
      text-decoration: none;
      font-size: 25px;
      color: #000000;
      display: block;
      transition: 0.3s;
    }
    
    .sidebar a:hover {
      color: #949191;
    }
    
    .sidebar .closebtn {
      position: absolute;
      display: inline-block;
      top: 0;
      right: 25px;
      font-size: 36px;
      margin-left: 50px;
    }

    #sidebarbottom {
      height: 68%;
      display: flex;
      align-items: flex-end;
   }
  </style>
    <div class="sidebar">
      <div id = "title">
        <object data = "../../assets/bujo-logo.svg" id = "logo"></object>
        <a href="javascript:void(0)" class="closebtn" id = 'closebtn'>&times;</a>
      </div>
      <a class= "calendar" href="">Monthly Calendar</a>
      <a href = "#">Settings</a>
      <a href = "#">Log Out</a>
      </div> 
    </div>
  `;

    // create a shadow root for this web component
    this.attachShadow({ mode: 'open' });

    // attach cloned content of template to shadow DOM
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /*
  set sidebar(calendar) {
    console.log('In sidebar component setter');
    const root = document.URL.split('/')[2];
    const path = 'http://' + root + '/source/frontend/app/page-calendar-monthly/calendar.html';
    const url = new URL(path);
    url.hash = hash;
    this.calendar.href.value = url;
  }
  */
}
window.customElements.define('side-bar', sidebar);
