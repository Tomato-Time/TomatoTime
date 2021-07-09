# Project Plan

Pod Members: **Add Pod Members Names**

## Problem Statement and Description

Insert the latest summary of your problem statement and app description.

## User Roles and Personas

Include the most up-to-date user roles and personas.

## User Stories

List the current user stories you will implement.

## Pages/Screens

List all the pages and screens in the app. Include wireframes for at least 3 of them.

## Data Model

Model for users: 

| **Column name** | **type** | **description** |
| :----         | :---:      | :---:         |
| id        | SERIAL | PRIMARY KEY |
| password |  TEXT NOT NULL | user's hashed password |
| first_name | TEXT | user's first name |
| last_name |  TEXT | user's last name |
| email | TEXT NOT NULL UNIQUE | email is unique and has an @ symbol |
| created_at |  TIMESTAMP | date when user created account | 

Model for settings: 

| **Column name** | **type** | **description** |
| :----         | :---:      | :---:         |
| dark_mode | BOOLEAN | indicates whether the user wants light or dark mode | 
| user_id | INTEGER | REFERENCES users(id) ON DELETE CASCADE |

Model for tasks:

| **Column name** | **type** | **description** |
| :----         | :---:      | :---:         |
| id        | SERIAL | PRIMARY KEY |
| input | CHAR | the task that the user added to their todo list |
| priority | INTEGER | 1-5 priority level |
| deadline | TIME | the time the user hopes to be done with that task |
| user_id | INTEGER | REFERENCES users(id) ON DELETE CASCADE |

Model for countdown_timer: 

| **Column name** | **type** | **description** |
| :----         | :---:      | :---:         |
| id        | SERIAL | PRIMARY KEY |
| pomodoro | INTEGER | minutes user wants to work |
| short_break| INTEGER | minutes user wants their short break to be | 
| long_break | INTEGER | minutes user wants their long break to be | 
| user_id | INTEGER | REFERENCES users(id) ON DELETE CASCADE |

Model for countdown_timer_session: 

| **Column name** | **type** | **description** |
| :----         | :---:      | :---:         |
| start_time | TIMESTAMP | time the session is started | 
| end_time | TIMESTAMP | time the session was ended | 
| minutes_logged | INTEGER | keeping track of time worked: updated after each working period ends| 
| day_logged | TIMESTAMP | only triggered once at the beginning of a session |



## Endpoints

List the API endpoints you will need to implement.

User story identifier: 

| **CRUD** | **HTTP Verb** | **description** | **User stories** | **Model being modified** | 
| :----         | :---:      | :---:         | :---: | :--------------: |
| Create | POST | Create a new user account | S2 | modify the users model | 
| Create | POST | Create a new start point for minutes being tracked activated when user hits play | S1, S2, O2 | ? | 
| Update | PUT | Update user's minutes for the day | S2, O2 | modifies the countdown_timer_session table | 
| Update | PUT | Update user's account preferences (ex darkmode feature) | O4 | modifies settings model | 
| Read | GET | fetch the list of tasks on todo | S5 | reads from tasks model | 
| Delete | DELETE | delete a task from todo | S5 | modifies tasks model, deletes an task by id | 
| Create | POST | add a new task to todo | S5 | adds a new todo to tasks table | 
| Update | PUT | Update the user's timer interval preferences | S1, S2 | modifies countdown_timer model | 
| Update | PUT | allow user to edit the todo task | S5 | modifies tasks table, edit an existing todo accessed by id | 


***Don't forget to set up your Issues, Milestones, and Project Board!***
