class sidebar extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');

    template.innerHTML = `<head>
    <!-- Logo -->
    <link rel="icon" type="image/jpeg" href="/source/frontend/assets/mini-logo.svg">

    <!-- Nunito Font -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200&display=swap" rel="stylesheet">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <!-- Icons -->
    <link href='https://fonts.googleapis.com/css?family=Nunito' rel='stylesheet'>
    </head>

    <style>/**
    * Stylesheet for calendar.html
    */

    /* colors for light-theme */
    :root {
      --background-color: white;
      --text-color: #1c1c1e;
      --accent-color1: #c7c7cc; 
      --nav-color: #fcfcfc; /* drop down box color */
      --nav-color-hover: #f2f2f7;
    }  

    /* colors for dark-theme */
    [data-theme="dark"] { 
      --background-color: #1c1c1e;
      --text-color: #f2f2f7;
      --accent-color1: #8e8e93;
      --nav-color: #2c2c2e;
      --nav-color-hover: #48484a;
    }

    body {
      font-family: 'Nunito Sans', sans-serif;
      background-color: var(--background-color);


      /* display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 100px);
      gap: 10px;
      grid-template-areas:
        'sidebar content content'
        'sidebar content content'
        'sidebar content content'
        'sidebar content content' */
    }

    /* CSS Grid */
    .main-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 100px);
      gap: 10px;
      grid-template-areas:
        'sidebar top-nav top-nav'
        'sidebar content content'
        'sidebar content content'
        'sidebar content content';
    }

    /*  CSS Grid End*/


    /* Styling for dropup menu */
    body .mySidebar .dropdown .dropdown-menu{
      background-color: var(--nav-color);
    }

    body .mySidebar .dropdown .dropdown-menu li a{
      color: var(--text-color);
    }

    body .mySidebar .dropdown .dropdown-menu li a:hover{
      background-color: var(--nav-color-hover);
    }

    /* 
    body .main-container table thead tr td{
      background-color: #1c1c1e;
    } */

    .dropdown-menu {
      background-color: var(--nav-color);
    }


    .dropdown-menu a {
      color: var(--text-color);
    }

    .dropdown-menu a:hover {
      background-color: var(--nav-color-hover);
    }

    body .main-container table{
      background-color: #1c1c1e;
    }


    table {
      margin-left: auto;
      margin-right: auto;
      height: auto;
      width: auto;
      border-collapse: collapse;
      color: var(--text-color);
    }



    tbody td {
      vertical-align: top;
      text-align: left;
      border: 1px solid var(--accent-color1);
      width: 10rem;
      height: 8rem;
    }


    tbody tr th {
      border: 1px solid var(--accent-color1);
      color: var(--text-color);
    }



    thead {
      /* background-color: #333; */
      border: 1px solid var(--accent-color1);
      background-color: #007aff;
      color: white;
      text-align: center;
    }

    .monthyear {
      height: 3rem;
    }

    /* The sidebar menu */
    .mySidebar {
      height: 100%;
      grid-area: sidebar;
      position: fixed;
      background-color: var(--nav-color);
    }

    .main-container {
      grid-area: content;
      justify-content: center;
    }

    #logo {
      display: inline-block;
    }

    /* Style page content - use this if you want to push the page content to the right when you open the side navigation */
    #main {
      /* grid-area: content; */
      transition: margin-left .5s;
      /* If you want a transition effect */
      padding: 20px;
    }

    /* Style month and year title*/
    #monthTitle {
      font-size: 30px;
    }

    #yearTitle {
      font-size: 20px;
    }

    /* Pointer on buttons back/forward buttons*/
    #backmonth:hover {
      cursor: pointer;
    }

    #forwardmonth:hover {
      cursor: pointer;
    }

    .fas {
      color: var(#007aff);
    }</style>

  <div class="mySidebar">
  <div class="d-flex flex-column flex-shrink-0 bg-light"
  style="width: 4.5rem;  display: flex; height: 100%; align-items: stretch;">
  <a href="/" class="d-block p-3 link-dark text-decoration-none" title="" data-bs-toggle="tooltip"
    data-bs-placement="right" data-bs-original-title="Icon-only">
    <span class="visually-hidden center-block"><img src="../../assets/nav-logo.svg" /></span>
  </a>
  <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
    <li class="nav-item">
      <a href="#" class="nav-link py-3 border-bottom" aria-current="page" title="Home" data-bs-toggle="tooltip"
        data-bs-placement="right" data-bs-original-title="Home">
        <i class="fas fa-home fa-2x"></i>
      </a>
    </li>
    <li>
      <a href="#" class="nav-link active py-3 border-bottom" title="Month" data-bs-toggle="tooltip"
        data-bs-placement="right" data-bs-original-title="Month">
        <i class="fas fa-calendar-alt fa-2x"></i>
      </a>
    </li>
    <li>
      <a href="/source/frontend/app/page-day/day.html" class="nav-link py-3 border-bottom" title="Week"
        data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Week">
        <i class="fas fa-calendar-week fa-2x"></i>
      </a>
    </li>
    <li>
      <a href="#" class="nav-link py-3 border-bottom" title="Day" data-bs-toggle="tooltip"
        data-bs-placement="right" data-bs-original-title="Day">
        <i class="fas fa-calendar-day fa-2x"></i>
      </a>
    </li>
    <li>
      <a href="#" class="nav-link py-3 border-bottom" title="Journal" data-bs-toggle="tooltip"
        data-bs-placement="right" data-bs-original-title="Journal">
        <i class="fas fa-book fa-2x"></i>
      </a>
  </li>
  </ul>

  <!--  -->
  <div class="dropdown border-top">
    <button type="button" class="btn" data-toggle="dropdown">
      <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle"
        data-bs-toggle="dropdown-menu">
        <i class="fas fa-user-circle fa-2x" id="avatar" aria-hidden="true"></i>
      </a>
      <div class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li>
          <hr class="dropdown-divider">
        </li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </div>
    </button>
  </div>
</div>
</div>`;

    // create a shadow root for this web component
    this.attachShadow({ mode: 'open' });
    // attach cloned content of template to shadow DOM

    const script2 = document.createElement('script');
    script2.src = 'https://code.jquery.com/jquery-3.3.1.slim.min.js';
    script2.crossorigin = 'anonymous';
    this.shadowRoot.appendChild(script2);

    const script3 = document.createElement('script');
    script3.src = 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js';
    script3.crossorigin = 'anonymous';
    this.shadowRoot.appendChild(script3);

    const script4 = document.createElement('script');
    script4.src = 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js';
    script4.crossorigin = 'anonymous';
    this.shadowRoot.appendChild(script4);
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    const script1 = document.createElement('script');
    script1.src = 'https://kit.fontawesome.com/c7fe59e5a5.js';
    script1.crossorigin = 'anonymous';
    this.shadowRoot.appendChild(script1);
  }
}
window.customElements.define('side-bar', sidebar);
