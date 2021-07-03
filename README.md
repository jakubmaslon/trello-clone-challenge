# Kabs frontend coding task
The goal is to implement an application to manage working tasks. See the __[user stories](#user-stories)__ for the application details to be implemented.

Clone this repository and create a [git bundle](https://git-scm.com/docs/git-bundle) and send it to us when you finished the task. One of the most important topics we want to see, is how you commit your progress. This does not mean every commit has to be perfect.

# User stories
* As a user I can create tasks, so that all tasks for a project can be tracked. ✅
  * Acceptance Criteria: ✅
  * A task must have a title ✅
  * A task must have a long description ✅
  * A task must have the status "ToDo" ✅
  * A task must have the user who created it ✅
  * A task must have the date and time when it was created ✅
* As a user I can change the status of a Task, so that the progress of the project can be tracked. ✅
  * Acceptance Criteria: ✅
  * A task must have the user who updated it ✅
  * A task must have the date and time when it was updated ✅
  * Only the following status transitions are allowed, see __[state transitions](#state-transitions)__ ✅
* As a user I can change the title and long description of a task. ✅
* As a user I can assign a task to another user, so that the responsibility of a task can be visualized. 👀
* As a user I will see the history of a Task, so that I can track the history of a task. ✅
  * Acceptance Criteria: ✅
  * The user of a change must be tracked ✅
  * The date and time of a change must be tracked ✅
  * The previous and the next value of a change must be tracked ✅

## State transitions
```plantuml
scale 10
skinparam linetype ortho
skinparam monochrome true

[*] --> ToDo

ToDo -> InProgress
InProgress -up-> Blocked
InProgress -> InQA
InQA --> ToDo
InQA -> Done
Done -> Deployed
Blocked --> ToDo

Deployed --> [*]
```

## Tech Stack
* Implement the app using [React (UI Library)](https://reactjs.org/).
  * preferred [typescript](https://www.typescriptlang.org/) but not mandatory
* Create tests cases for your components using Jest (Test runner) / React Testing Library (Testing) / Jasmine / cypress
* Please stick with React's internal APIs to handle state management (React Context API)
* Prefer function components and hooks over class components
* The application must be primary optimized for mobile devices and must have a optimized layout for desktop.
* Generating documentation for react applications React Docgen / JSDoc

## Acceptance Criteria
* Test cases is mandatory
* Test coverage should be above 80%.
* The app should be working and buildable with no errors.
* There should be individual commits with meaningful commit messages for every user story.
* API Documentation




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
