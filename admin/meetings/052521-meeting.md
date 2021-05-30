# Meeting Minutes ~ 052321-meeting  
## I. Meeting Information
**Meeting Purpose:** Weekly Group meeting  
**Meeting Date/Time:** May 25th, 2021, 5:20pm - 6:30pm  
**Timezone:** Pacific Standard Time (UTC−07:00)  
**Meeting Location:** Virtually through Zoom (Link: https://ucsd.zoom.us/j/98413787650)  
**Note Taker:** Edward Yang/Alan Wang  

## II. Attendees
People who attended the meeting:
- [x] Edmund Leibert III (*Team Lead*)
- [x] Edward Yang (*Team Lead*)
- [x] Alan Wang
- [x] Daisuke Chon (*Temporary Team Lead*) (excused)
- [ ] Kenny Chan
- [x] Etienne Robin
- [ ] Elisa Brooks
- [x] Evan Martinez (*Temporary Team Lead*)

## III. Agenda Items

Item | Description
---- | ----
Review of completed tasks | • What has everyone done since last meeting?<br>
Overall app architecture | • What will our final app look like?<br>
Action Items for next time | • What do we need to get done before next meeting?<br>
Task Assignment | • Who should complete each task? <br>

## IV. Discussion Items

**New Items**
### Review of completed tasks
**Edmund:**
- Worked on login and backend 
- Use nodejs as our basic framework
- Using libraries - express, path, body-parser, mongoose
- How mongodb works 
  - Cluster - mongoDB version of a database, how things are stored
  - Databases 
  - Documents - objects 
  - See Google Doc/Slack for mongoDB access link 
- app.js  - top most file for our database 
- APIs are mostly completed
- Concerns:
  - bcrypt issue 
  - How to reference bullets when user logs in - user id? 
    - Once login is successful, we will tell CRUD runtime the user’s id
    - Crud runtime will use this to query bullets
    - Page then works with what we get  
    - This way API functions won’t change 
    - We will put all bullets in one db, have server send bullets associated with user ID 
  - Routing
    - What happens when someone presses back button on month after login
    - Router will send them back to the month view  
  
**Daisuke:**  
- Finished day view html with notespace
- Defer styling to kenny/Elisa 
- Potential things to do:
  - Document sidebar web component 
  - Have a button to create notes 
  - Remove ability to create note bullets from event
  - Page navigation from url hash
  - Maybe make a month clickable to go back to month in day view

**Edward:**
- Added bullets, navigation to day view
- Added URL hash reading 
  - Daisuke should plan to read URL hash
  - If hash is empty, bring us to the current date
  - Otherwise load bullets using URL hash as date
  - Concerns: 
  - Date format
    - May be an issue during integration
    - Take note of when you’re using date’s with different format 
    - Will need to standardize URL hash 

### Overall architecture 
See ADR for 052521 for overall architecture decisions 

**Old Items**
Topic | Who  | Notes |
----- | ---- | ----- |

## Task Assignment/Action Items 
Everything part of MVP due TOMORROW (basically everything here):  
**Evan + Alan:**  
- Come up with plan for testing, test suite

**Daisuke:**  
- Update function calls to use new  CRUD API standards 
- Document how to add sidebar, update sidebar with new links
  - if time make sidebar float on page
- Account for updated hash date format in day view 
- Make month header clickable and take you back to calendar page for that month (maybe with same shimmer effect) 

**Edmund + Etienne:**  
- Finishing up backend CRUD
  - Documentation	
  - Comply with api
  - Add runtime function to use auth cookie
- Make sure router will take user back to login for no auth cookie, make sure router will take user to month view for month back button (ensure history state is not corrupted)
- Document build/deploy of app

**Frontend (Kenny + Elisa):**  
- add visual indicator for when people hover on each date so they know that its clickable (css on hover, change gradient to maybe add a shimmer effect) 
- Style day view
- Make global style sheets (not part of MVP) 
- If all above are done, start making a settings page, to handle deleting account,
- (potential feature) add button for downloading bullets to local file
- (potential feature) add button for uploading bullets from local file

**Edward:**  
- Make top level utils js file for common functions 
- readHashStr() - Read date hash and return JS Date object  
- writeHashStr() - Take Date object and return date hash  
- Note: JS Date objects getyear returns offset from 1900


## VI. Other Notes & Information
- Evan has now taken on a greater leadership role in the team. 

###### Future discussion items...
- Deployment, where to host our webpage
- End to End testing 