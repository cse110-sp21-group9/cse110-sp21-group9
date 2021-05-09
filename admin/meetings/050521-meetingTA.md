# Meeting Minutes ~ 042821-meetingTA
## I. Meeting Information
**Meeting Purpose:** Weekly Meeting with TA  
**Meeting Date/Time:** May 5th, 2021, 3:00pm - 3:45pm  
**Timezone:** Pacific Standard Time (UTC−07:00)  
**Meeting Location:** Virtually through Zoom (Link: https://ucsd.zoom.us/j/98413787650)  
**Note Taker:** Edward Yang/Alan Wang  

## II. Attendees
People who attended the meeting:
- [x] Edmund Leibert III (*Team Lead*)
- [x] Edward Yang (*Team Lead*)
- [x] Alan Wang
- [x] Daisuke Chon (*Temporary Team Lead*)
- [ ] Kenny Chan
- [ ] Etienne Robin
- [x] Elisa Brooks
- [ ] Evan Martinez

## III. Agenda Items

Item | Description
---- | ----
Updates | • Submitted pitch assignment<br>• Beginning to look into project development<br>
Action Items for next time | • Meet with TA to discuss virtualization/data layer <br>• Start coding now <br>• Start creating UI based on wireframes(frontend)<br>• Reevaluate backend strategy (backend) <br>• Set up CI/CD pipeline on repo


## IV. Discussion Items

**New Items**
Topic | Who  | Notes |
---------- | ---- | ----- |
Reviewed project pitch with TA | Everyone | • Wireframing looked good <br> • TA had concerns about virtualization/data layer, needs more info <br> • 
Advice - backend | TA | • Learning curve may be high for creating backend <br> • Consider couchDB/pouchDB (similar to mongoDB in that uses JSON format) to address out concerns about local data storage <br> 
Advice - load balancing| TA | • Can use load balancing/cloud computing for project <br> • Uses virtualization - idea is similar to abstraction where we make a physical resource virtually accessible in a bigger capacity <br>  • May need to use cloud in an abstract way (black box)<br>• This is a big rabbit hole, should wait for professor's lecture on this, can keep everything local for it to work<br> 
Advice - Login feature| TA | • Login feature can be done, doesn't have to be a nogo<br> • Depends on how simple/complicated you make it<br> • Experiment with firebase auth/etc<br>
Advice - Login feature| TA | • Login feature can be done, doesn't have to be a nogo<br> • Depends on how simple/complicated you make it<br> • Experiment with firebase auth/etc<br>
Advice - Testing| TA | • Account for testing in Gantt chart<br> • Probably won't be able to do stylized themes/customization<br> • Will need to go through multiple levels of testing  (unit -> unit component -> integration -> system -> acceptance)<br>• Manual testing will probably be the last thing after automated testing (acceptance level)<br>• Unit testing can be covered while coding (E.g. coders need to create/pass 2 unit test cases for each story point)<br>  
Advice - ADR| TA | • ADR - records any decision we make that affects application<br> • Ex: minimalistic UI - does not have more than x elements/pages<br>• Ex: using pouchDB<br>• Ex: categorizing features as core/nonessential<br>  

**Old Items**
Topic | Who  | Notes |
----- | ---- | ----- |
N/A  | N/A  | N/A |


## V. Action Items
| Done? | Item | Responsible  | Due Date  | Description  |
| ----- | ---- | ------------ | --------- | --------- |
| ✔️   | Project pitch | Everyone | 5-3-2021  | All tasks due on that date |

## VI. Other Notes & Information
- TA will put CI/CD pipeline resources in slack
- Don't stress about timeline, but every week is crucial
###### Future discussion items...
- Git conventions for next meeting
- Assigning development tasks to team members
