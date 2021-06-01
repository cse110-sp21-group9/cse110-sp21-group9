# Meeting Minutes ~ 052621-meeting  
## I. Meeting Information
**Meeting Purpose:** Weekly Group meeting  
**Meeting Date/Time:** May 26th, 2021, 5:20pm - 6:30pm  
**Timezone:** Pacific Standard Time (UTC−07:00)  
**Meeting Location:** Virtually through Zoom (Link: https://ucsd.zoom.us/j/98413787650)  
**Note Taker:** Edward Yang/Alan Wang  

## II. Attendees
People who attended the meeting:
- [x] Edmund Leibert III (*Team Lead*)
- [x] Edward Yang (*Team Lead*)
- [x] Alan Wang (late)
- [x] Daisuke Chon (*Temporary Team Lead*) 
- [x] Kenny Chan
- [x] Etienne Robin
- [x] Elisa Brooks
- [x] Evan Martinez (*Temporary Team Lead*)

## III. Agenda Items

Item | Description
---- | ----
Review of completed tasks | • What has everyone done since last meeting?<br>
Future plans | • What should we doing in the coming days?<br> 
Action Items for next time | • What do we need to get done before next meeting?<br>
Task Assignment | • Who should complete each task?<br>

## IV. Discussion Items

**New Items**
### Review of completed tasks
**Frontend(Elisa + Kenny):**  
- Added hover ability to each day in the monthly view
- Merged signin/login with Edmund's backend
- Fixed the weird styling that was going on
  
**Daisuke:**  
- Things I got done from roadmap:
  - Documented sidebar instructions + updated text in the sidebar to model the diagram from yesterday.
  - Account for hash date format in day view. The day view's displayed Month,
  - Date, and weekday (IE sunday, monday, ...) should be correct for the day that you click on the month view. Also, the corresponding bullets for that day should load for that specific day
  - Added Note bullet functionality: You can add note bullets in the notespace. It follows the bullet object format but it doesn't use modals to create. Just a simple text box and only the 'title' property is used. The 'Date' property is set to be the date that we are creating the bullet in.
  - Made month header navigate you back to calendar page for that month with a hover effect
  
- Things I didn't get done from the roadmap:
  - Update CRUD function calls: When was the latest updates to the function calls pushed? I pulled from staging at like 10:30PM yesterday and didn't see any changes to crudFunctions.js
  - Use the hash date format that we agreed on yesterday. Wanted to make sure date navigation worked so I used Edward's previous format that was written in his calendar.js file.
  - Make functional links in the sidebar. This is actually a bit more complicated than I thought it was going to be. I'll try to get this done tonight.
  - Make the sidebar floating. Forgot to do this.

**Edward:**
- Updated monthly calendar with hash, new date format
- Added on hover effect for month dates
- Added utils functions for writing/reading date hash

**Edmund + Etienne:**  
- Finished login
- Finished APIs
- Merged login with frontend, resolved conflicts 
- Documented functions/backend 

### Future plans 
- Day hasn’t been fully styled because there are some hiccups in the code
- Month styling is good
- Sprint review at the end of the week
  - Reevaluate what we need
- Next sprint (next monday)
  - Weekly view
  - Dashboard
  - Calendar widget
- this week - Soft deadline for getting most of our stuff out
- Dark/ Light theme customization (minimalistic design)
- Close github issues and open new issues


**Old Items**
Topic | Who  | Notes |
----- | ---- | ----- |

## Task Assignment/Action Items 
**Evan, Alan, Edmund:**  
- Migrate pipeline from dev, release branch structure to feature branch for specific features
- Move code out of staging into feature dev branches 

**Daisuke + Evan + Edward:**  
- marriage of month/ day view
- Update function calls to use new  CRUD API standards 

**Daisuke:**  
- Take a break

**Etienne:**  
- Documentation for mongoDB (glossary github issue)
**Edmund:**  
- Finishing up backend CRUD
- Review styling 

**Frontend (Kenny + Elisa):**  
- styling for day view

## VI. Other Notes & Information

###### Future discussion items...
- Deployment, where to host our webpage
- End to End testing 