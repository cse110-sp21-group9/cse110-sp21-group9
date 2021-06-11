# Final App Architecture
Status: Accepted

Deciders: Alan, Daisuke, Edmund, Edward, Elisa, Etienne, Evan, Kenny

Date: 6/10/2021

## Decisions
We decided on deploying our app through GitHub pages because we ran into issues with Heroku because the command Alan was using to set up the pre commit script wasn't working with Heroku. We also had to create a homepage that would serve as a welcome page for the user.

### General App Structure
- Day View
  - The mini calendar allows the user to navigate between days quickly and easily
  - We can also filter by tags, which can be added and removed with the "Edit Tags" item in the drop-down menu
  - The notespace in the corner allows the user to write notes
- Monthly Calendar
  - There is now a "today" button that bring you back to the current 
  - The user can now filter by event, task, and note bullets
- Side Bar
  - The side bar contains a menu in order to navigate to the homepage, the day view, the month view, and settings
  - The settings allows the user to switch between the light and dark mode themes, to download a backup file of the bullet journal, and to upload a bullet journal file

### GitHub Pages Structure
- We had to fix a lot of the directory paths so that clicking places in the app did not bring the user to a 404 page.
  - We had to change the absolute paths that only worked with our local Git repositories with the VS Code Liveserver extension to relative paths that would work with GitHub Pages.

### Homepage
- We had to create a homepage which also served as a welcome page for the user when they visited our BuJo Studio app. The button labeled "Let's Get Started" brings the user to the relative link `../page-day/day.html`, which brings the user to the day view, which is where most of the bullet journaling happens.
- We also added our BuJo logo link in the top-left corner of every page in our app that would take you to the homepage, which had the relative link `../../../../index.html`.
