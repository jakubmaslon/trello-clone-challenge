# Kabs frontend coding task
The goal is to implement an application to manage working tasks. See the __[user stories](#user-stories)__ for the application details to be implemented.

Clone this repository and create a [git bundle](https://git-scm.com/docs/git-bundle) and send it to us when you finished the task. One of the most important topics we want to see, is how you commit your progress. This does not mean every commit has to be perfect.

## Requirements
* Implement the app in [typescript](https://www.typescriptlang.org/).
* Use [react](https://reactjs.org/).
* Create tests for your components.
* Do not use external state management libraries.
* The application must be primary optimized for mobile devices and must have a optimized layout for desktop.

## User stories
* As a user I can create tasks, so that all tasks for a project can be tracked.
  * Acceptance Criteria:
  * A task must have a title
  * A Task must have a long description
  * A Task must have the status "ToDo"
* As a user I can see a list of all tasks grouped by it's status, so that everybody can get a general overview of the project.
* As a user I can change the status of a Task, so that the progress of the project can be tracked.
  * Acceptance Criteria:
  * Only the following status transitions are allowed, see __[state transitions](#state-transitions)__
* As a user I can assign a task to another user, so that the responsibility of a task can be visualized.

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
