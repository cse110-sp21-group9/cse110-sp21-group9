# Meeting Minutes ~ 051621-Sprint 1 Review meeting
## I. Meeting Information
**Meeting Purpose:** Weekly Group meeting/Sprint 1 Review meeting
**Meeting Date/Time:** May 16th, 2021, 5:00pm - 5:50pm  
**Timezone:** Pacific Standard Time (UTC−07:00)  
**Meeting Location:** Virtually through Zoom (Link: https://ucsd.zoom.us/j/98413787650)  
**Note Taker:** Alan Wang/Daisuke Chon  

## II. Attendees
People who attended the meeting:
- [x] Edmund Leibert III (*Team Lead*)
- [x] Edward Yang (*Team Lead*)
- [x] Alan Wang
- [x] Daisuke Chon (*Temporary Team Lead*)
- [x] Kenny Chan
- [x] Etienne Robin
- [x] Elisa Brooks
- [x] Evan Martinez

## III. Agenda Items

Item | Description
---- | ----
Sprint Review| • What did we accomplish during this sprint? <br>
Retrospectives | • How should we conduct our retro? <br>
Team Status video| • How should we record status video?<br>
Plans for next sprint| • What should we do next sprint?<br>
Action Items for next time | • What do we need to get done before next meeting?<br>
Task Assignment | • Who should complete each task? <br>

## IV. Discussion Items

**New Items**
Topic | Who  | Notes |
---------- | ---- | ----- |
Sprint Review| Alan | • Organized folders for pipeline <br> • Worked out pipeline for phase 1<br> • Decided style guide<br>
Sprint Review| Daisuke | • Added onto Evan’s CRUD frontend components <br> • Added bullet, type and tag functionality<br> • Can combine with backend API if necessary<br>
Sprint Review| Edmund | • Looked into pouchDB  <br> • Decided that it may be better to use MongoDB<br> 
Sprint Review| Edward | • Organized folders for pipeline <br> • Worked out pipeline for phase 1<br> • Will work out issues<br> • Provided initial CRUD functionality<br>
Sprint Review| Elisa | • Tinkered with bootstrap to create a homepage, sign-in page<br>
Sprint Review| Etienne | • Worked on CRUD with Daisuke and Evan <br> • Set up Retrium for retrospectives<br> • Looked into Google Calendar API, concluded that it's not necessary right now <br>
Sprint Review| Evan | • Decided style guide for everyone <br> • Got Bullet functionality working for CRUD<br> • Worked with Kenny and Edmund on backend <br> • Looked into hashing/caching passwords
Sprint Review| Kenny | • Set up database with basic model <br> • Created Login and create account page <br> • Database creates user IDs that can be linked to each journal 

Retros | Everyone| • Will use Retrium to conduct retros<br> • Daisuke, Etienne, and Elisa will decide on a format<br> • Retro will occur before next team meeting on Wednesday<br>
Team Status Video | Everyone| • Edmund, Evan, and Kenny will handle video<br> • Can use zoom recording of this meeting to help
Plans for next sprint | Everyone| • Will decide on tasking next Wednesday meeting<br>

Calendar | Everyone | • Full calendar was a no-go<br> • Will need ot come up with an alternate API or make ourselves<br><br>Format:<br> • Calendar linked to the journal<br> • Grid displaying bullets corresponding to day of bullet<br> • Users edit bullets on calendar by clicking on each day and editing journal entries for that day<br> • Can abstract +- 3 years from now 2018 - 2021 - 2024<br> • Javascript may have a date model we can use<br>
Week view | Everyone | • Now a rabbit hole, will get to if we have time<br>

Action items/Task assignment| Everyone | see action items section |

**Old Items**
Topic | Who  | Notes |
----- | ---- | ----- |

## V. Action Items
| Done? | Item | Responsible  | Due Date  | Description  |
| ----- | ---- | ------------ | --------- | --------- |
| ✔️ | Meet with TA about fullcalendar| Frontend + Kenny | 5-16-2021  |  • Investigate how we plan to use full calendar<br> • Meet with TA to discuss our plans for fullcalendar so he can make sure it's ok |
|  ✔️  | Meet with TA about backend | Evan/Daisuke| 5-16-2021  | Meet with TA to discuss virtualization/data layer in further depth, he needs more information |
| ✔️ | Frontend work | Etienne/Daisuke | 5-16-2021  | • Merge Daisuke's and Evan's code together<br> • Work on frontend html/js for demo |
|  ✔️ | Design/styling | Elisa | 5-16-2021  | • Style demo/main page, login page<br> • Can move on to other pages if you have time <br> • Can use native css or Bootstrap |
|  ✔️ | Update CI/CD pipeline| Alan/Edward | 5-16-2021  | • Add staging branch for testing to pipeline<br>|
| ✔️ | Decide on file structure| Alan/Edward | 5-16-2021  | • Meet to decide on file structure for storing project files, now that we're starting to dev|

|    | Integrate apiStub.js with mongoDB (backend)| Kenny, Evan | 5-23-2021  | • Come to an agreement on how Evan's API can be integrated with mongoDB in the backend, then implement<br> • Have agreement done by this sunday(5-16)<br> • Have implementation done by next sunday(5-23) |
|    | Help with development | Alan/Edward | 5-16-2021  | • Assist development team with anything they need help with |
|    | Get Demo ready | Everyone| 5-17-2021  | • integrate frontend/login with mongoDB<br> • add functionality with APIs |
|    | Compile sprint review meeting notes | Alan, Edward | 5-18-2021  | Compile/upload spring meeting review meeting notes to repo |
|    | Setup Retrospective | Daisuke, Etienne, Elisa | 5-18-2021  | • Setup format/time for retro<br> • Compile/upload retro notes to repo |
|    | Team status video | Edmund, Kenny, Evan | 5-18-2021  | • Record team status video and publish to repo |
|    | Commit to mongoDB | Backend | 5-19-2021  | • Continue developing mongoDB as we previously agreed upon<br> • Create/upload ADR to repo describing backend decisions |
|    | Develop Calendar | Frontend | 5-19-2021  | • Continue developing calendar as discussed in this meeting<br> • Create/upload ADR to repo describing calendar decisions |
|    | Finish MVP | Everyone | 5-24-2021  |• Finish the MVP of our BuJo by end of next week |

## VI. Other Notes & Information
- Miro board link: https://miro.com/app/board/o9J_lHlYETY=/
- Figma link for wireframes/personas:
https://www.figma.com/team_invite/redeem/wfViANN8A0ARciKhU77zxS

###### Future discussion items...
- Conduct Retro
- Tasks for next sprint