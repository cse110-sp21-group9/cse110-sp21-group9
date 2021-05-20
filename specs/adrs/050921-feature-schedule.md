# Feature Categorization
Status: accepted
Deciders: Alan, Elisa, Edmund, Edward, Etienne, Evan, Kenny
Date: 5/9/2021 @ 5PM

## We have decided to work on the features in the following order:
1. CRUD features for bullets
2. Calendar display for plans/ events
3. Log in
3. Migration of plans/events across multiple days
4. Filtering plans/events based on tags
5. Dashboard
6. Journal
7. Notes
8. Analysis of Month
9. Templates/Widgets
10. Tutorial
11. Messages
12. Styled BuJo themes

## Decisions
### Definition of bullet
Overarching name for any entry into the bullet journal. Plans, events, tasks, and notes are all subclasses of a "bullet".

Example:
Bullet: XQV123
- Type: [Event, Task, Note]
- Date: Time since creation of journal
- Description: Lorem Ipsum
- Tag [school, sports, etc.]

### Still deciding on whether to do log in or not

### Use mongoDB as backend
