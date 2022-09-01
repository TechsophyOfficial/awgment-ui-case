## About

The following are the features of **Case Inbox** Module.
* Provides user interface to manage cases of a currently login user in a tenant
* **Case Inbox** - Enables tenant user to perform the following operations
    * ***My Tasks*** - Displays list of tasks/cases assigned to a currently login user
        *  ***Search*** - To search tasks/cases based on task name and other available filters
        *  ***Sort*** - To sort task/cases based on priority,due date,followup date etc
        *  ***Activites*** - Displays list of enabled/active/completed activities within a case
            * ***Enabled*** - Displays list of activites enabled to a user to start and work on them
            * ***Active*** - Displays list of activities which are started and in progress for completion
            * ***Completed*** - Displays list of activities which are completed in a case
        *  Following are the operations that can be performed on an **individual** task
            * ***Form*** - Displays a form associated to a task
            * ***Comments*** - Displays list of all comments added to a task
            * ***Add Comment*** - Allows to add a comment to a task
            * ***Complete*** - User can complete a task
    * ***Group Tasks*** - Displays list of tasks/cases from all the groups in which the currently login user is involved
        *  ***Search*** - To search tasks/cases based on task name and other available filters
        *  ***Sort*** - To sort task/cases based on priority,due date,followup date etc
        *  ***Add Comment*** - Allows to add a comment to a task
        *  ***Claim*** - User can claim a task to work on it. Upon claiming a task, task is assigned to user and can view the task in **My Tasks**  
    * ***All Tasks*** - Displays list of tasks/cases which are assigned to a user and involved in groups
    * ***Completed Tasks*** - Displays list of completed tasks/cases by a login user
    * ***ADD Filter*** - User can create a custom filter by choosing criteria to create a seperate screen to filter the tasks/cases. Upon creation of a filter a new menu item is added in sidenav to view the list of tasks/cases based on selected criteria.

  

## Prerequisites

1. Make sure node is installed in your system.

2. Go to the checked out project folder and run the command `npm install` 


## Docker build and run
docker build . -t awgment-ui-case

docker run -it -p 8181:80 --env-file docker.env awgment-ui-case:latest

curl localhost:8181/case-inbox/config.json

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run test -- --coverage --watchAll=false`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for development (takes .env) to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).