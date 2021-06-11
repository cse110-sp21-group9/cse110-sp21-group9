# CSE 110 Group 9 - Powellmon
## Bujo Studio
![Homepage](specs/interface/final-screenshots/homepage.PNG)
Our bullet journal app, Bujo Studio, can be accessed [here](https://cse110-sp21-group9.github.io/cse110-sp21-group9/).
## Final project videos 
- [Final public video](https://drive.google.com/file/d/1Oc6poIrnOCtyrYDlVDBMAxyNPdQ2xNJ5/view?usp=sharing)
- Final private video 

## Setup
To set up a local copy of this repo, follow these steps:   
1. Clone this repo to your local machine
2. Install [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/get-npm)
3. In your local copy, run `npm install` to install the dev dependencies and set up the pre-commit hook for the linter 

## CI/CD pipeline/Documentation
- All information about our CI/CD pipeline can be found in [admin/cpipeline](admin/cpipeline)
- The status of our latest pipeline can be found [here](admin/cpipeline/phase3.md)
- [Demo video](https://www.youtube.com/watch?v=mG6NFSDRwn8) for our pipeline 
- JsDocs can be found in [docs/](docs) and can be viewed [here](https://cse110-sp21-group9.github.io/cse110-sp21-group9/docs/index.html)

## Group materials
The [admin](admin) directory contains all the group artifacts for this project:  
- [meetings](admin/meetings) - contains all our group meeting notes
- [misc](admin/misc) - contains signed team contracts
- [videos](admin/videos) - contains team videos
- Sprint materials:
	- Sprint 1:
		- [Review meeting notes](admin/meetings/051621-sprint-1-review.md)
		- [Retrospective](admin/retrospectives/051821-retrospective.md) 
	- Sprint 2:
		- [Review meeting notes](admin/meetings/053021-sprint-2-review.md)
		- [Retrospective](admin/retrospectives/053021-retrospective.md) 
		
## Design documents
The [specs](specs) directory contains all the design documents for our app: 
- [adrs](specs/adrs) - contains the architecture design records(ADRs) for this project 
- [brainstorming](specs/brainstorm) - contains brainstorming artifacts
- [interface](specs/interface) - contains wireframes, diagrams, app screenshots for this project
- [Project pitch](specs/pitch/team-9-final-projectpitch.pdf) - initial pitch document describing initial app, risks, rabbit holes, etc. 
- [user profiles](specs/users) - contains the user profiles that inspired our app
	
## Source code
The [source](source) directory contains the source code for our app. It is broken up into the following folders:  
- [frontend](source/frontend) - contains frontend pages for app_
	- [app](source/frontend/app) - pages for our app, each page has its own folder containing HTML/CSS/JS related to that page
	- [assets](source/frontend/assets) - images for our app
- [backend](source/backend) - contains backend API/functions for managing CRUD operations
- [deprecated](source/deprecated) - contains files for pages/features that were scrapped/didn't get completed
		
## Testing
The [test](test) directory contains the test files for the automated unit and manual end-to-end tests. It is broken up into these folders:
- [dev](test/dev) - contains developer-generated Jest unit tests (basic function returns)
- [tester](test/tester) - contains tester-generated Jest unit tests (DOM manipulation)
- [integration](test/integration) - contains Jest integration tests (Frontend DOM with backend)
- [e2e](test/e2e) - contains manual Jest puppeteer end to end tests (user flows)
- The latest coverage report for our automated tests can be found [here](https://cse110-sp21-group9.github.io/cse110-sp21-group9/admin/test-reports/coverage/lcov-report/index.html)   
- Reports for end-to-end/manual tests are stored in [admin/test-reports](admin/test-reports). 
