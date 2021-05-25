# Backend and Login
Status: Accepted

Deciders: Alan, Daisuke, Elisa, Edward, Etienne, Evan, Kenny

Date: 5/12/2021 @ 4PM + 5/16/2021 @ 5PM

## We need to commit ourselves to some kind of backend structure to progress
We've been debating about how data is going to be stored and whether we want to do a login or not for too long. We need to commit ourselves to first figuring out whether we want to have a comprehensive backend, what backend service we should use, and following these two decisions, whether we want to do a login.

## Options

# Keep everything on local storage and not have any login
Probably the easiest option and we can divert resources that we would have dedicated to backend to work on a more comprehensive front end.

# Use MongoDB and have a login
Kenny (and later as we find out, Edmund) have some experience with this database so they can be comprise the backend team. According to Kenny, login should be pretty easy to implement so we will naturally be doing this.

# Use PouchDB and have a login
Sanat was pushing this database to us so it may be better than MongoDB.

## Decision Outcome
We decided to go with using MongoDB and having a login. Consequently, Edmund, Kenny, and Evan were reassigned to the backend team with Daisuke and Etienne being the frontend team. 