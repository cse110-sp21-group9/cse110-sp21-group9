/** This file implements a <sidebar> custom web component
 *  Credit to: w3Schools for a demo on this functionality
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
  

  #main {
    transition: margin-left .5s; 
    padding: 20px;
    width: 95%;
    height: 100vh;
  }
  </style>
    <div class="sidebar">
      <div id = "title">
        <object data = "bujo-logo.svg" id = "logo"></object>
        <a href="javascript:void(0)" class="closebtn" id = 'closebtn'>&times;</a>
      </div>
      <a href="#">Dashboard</a>
      <a href="#">Calendar</a>
      <a href="#">Tasks</a>
      <a href="#">Journal</a>
      <div id = "sidebarbottom">
        <a href = "#">Settings</a>
      </div> 
    </div>
  `;

    // create a shadow root for this web component
    this.attachShadow({ mode: 'open' });

    // attach cloned content of template to shadow DOM
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define('side-bar', sidebar);
