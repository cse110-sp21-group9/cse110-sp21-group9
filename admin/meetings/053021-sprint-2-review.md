# Meeting Minutes ~ 053021-Sprint 2 Review meeting  
## I. Meeting Information
**Meeting Purpose:** Weekly Group meeting/Sprint 2 Review meeting  
**Meeting Date/Time:** May 30th, 2021, 4:30pm - 5:30pm  
**Timezone:** Pacific Standard Time (UTC−07:00)  
**Meeting Location:** Virtually through Discord  
**Note Taker:** Alan Wang/Edward Yang 

## II. Attendees
People who attended the meeting:
- [x] Edmund Leibert III (*Team Lead*)
- [x] Edward Yang (*Team Lead*)
- [x] Alan Wang
- [x] Daisuke Chon (*Temporary Team Lead*)
- [x] Kenny Chan
- [x] Etienne Robin
- [x] Elisa Brooks
- [x] Evan Martinez (*Temporary Team Lead*)

## III. Agenda Items

Item | Description
---- | ----
Sprint Review| • What did we accomplish during this sprint? <br>
Retrospectives | • How should we conduct our retro? <br>
Plans for next sprint| • What should we do next sprint?<br>
Action Items for next time | • What do we need to get done before next meeting?<br>
Task Assignment | • Who should complete each task? <br>


## IV. Discussion Items

**New Items**
### Overview 
- Backend not yet completed, some bugs need to be fixed 
- MVP will be mostly complete once we integrate with day view 
- Roadmap may be a little optimistic 
  - We’re cutting dashboard - too similar to day view for current day 

### Progress updates  
**Edward**
- Settings page 
- import/export bullets from json file feature 
- Change mode function for light/dark mode  

**Kenny/Elisa**
- Light/dark mode css styling
 - Sidebar styling  

**Etienne** 
- still working on mini calendar  
 
**Edmund/Evan**
- ran into too many issues with database, will use localstorage for backend
- Goal is to allow user to log in to upload/download their bullets from db server 
 
**Alan**
- Finished unit tests for backend crud functions
  
### Conduct second retrospective
- See notes in retrospectives folder  

### Plans for next sprint 
**Important features we need**
- Settings page 
- Update UI for day view 
- Light/dark themes	
- Mini calendar (add to day view) 
- Landing page - augment home page 
  - Add a button to continue without an account 

## V. Task Assignment/Actions Items 
**Kenny/Elisa/Daisuke** 
- meet tonight to redesign day view UI   
  
**Evan** 
- update Backend, integrate with other views  

**Edmund/Evan** 
- create top-lavel page map in globals.js
- Keep path variables in one place
- To change to another page from one page, just change the url to mapping/hash  

**Continue working on remaining roadmap tasks (due 5/31)** 
- **Edmund**:
  - Look through local storage back end for bugs
  - Integrate back end into day view (due 5/28)
  - Move possible shared functionality from day and month view into globals and utils
  - Make bullets scroll on month view  
- **Kenny + Elisa**:
  - Frame out html and css for a landing page (hold off on this for now)
  - ~~Start doing color schemes for a dark theme~~
  - ~~start styling dashboard (if it is ready for styling)~~  
- **Etienne**:
  - Clone current mini calendar and change/add functionality
  - Add month display
  - Add month scrolling working
  - Make default behavior clicking day hash URL correctly and take you to the view for that day
  - Make default behavior clicking Month take you to the month view  
- **Daisuke**:
  - ~~Finish any framing needed on dashboard~~
  - ~~Think of something to fill the widget section or remove it~~
  - Integrate mini-cal into dashboard (now day view)
  - ~~Make dashboard load tasks for current day/week~~
  - If you finish above tasks and have free time:
    - ~~Tell Kenny or Elisa that dashboard is ready for styling~~
      - ask alan if he needs help writing test cases  
- **Edward**:
  - ~~Start work on a settings page~~
  - Possibly work with Elisa for style/lay out
  - Current planned settings:
    - ~~Light/Dark theme~~
    - User info, name, Birthday
    - ~~import/export bullet data~~  
- **Alan**:
  - ~~Write testing suit for back end crud functions~~
  - Run above testing suit and report any bugs to Evan or Edmund  
- **Evan**:
  - ~~Start working on import export feature for bullets from back end~~
  - Start working on settings and info storage for back end  


**Old Items**
Topic | Who  | Notes |
----- | ---- | ----- |


## VI. Other Notes & Information
- Miro board link: https://miro.com/app/board/o9J_lHlYETY=/
- Figma link for wireframes/personas:
https://www.figma.com/team_invite/redeem/wfViANN8A0ARciKhU77zxS

###### Future discussion items...
- Day view UI