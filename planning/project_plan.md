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
| dark_mode | BOOLEAN | indicates whether the user wants light or dark mode | 
| created_at |  TIMESTAMP | date when user created account |

Model for tasks:

| **Column name** | **type** | **description** |
| :----         | :---:      | :---:         |
| id        | SERIAL | PRIMARY KEY |
| input | CHAR | the task that the user added to their todo list |
| priority | INTEGER | 1-5 priority level |
| deadline | TIME | the time the user hopes to be done with that task |
| user_id | INTEGER | REFERENCES users(id) ON DELETE CASCADE |

Model for timer: 

| **Column name** | **type** | **description** |
| :----         | :---:      | :---:         |
| minutes_logged | INTEGER | we want some way to keep track of time spent working | 
| logged_at | TIMESTAMP | keeping track of what day the user used our timer | 




## Endpoints

List the API endpoints you will need to implement.

User story identifier: 

| **User Story** | **Id** |
| :----         | :---:   |

| **CRUD** | **HTTP Verb** | **description** | **User stories** |
| :----         | :---:      | :---:         | :---: |
| Create | POST | Create a new user account | ? | 
| Update | PUT | Update user's profile data (ex darkmode feature) | ? |
| Read | GET | fetch the list of tasks on todo | ? |
| Delete | DELETE | delete a task from todo | ? | 
| Create | POST | add a new task to todo | ? | 



***Don't forget to set up your Issues, Milestones, and Project Board!***
