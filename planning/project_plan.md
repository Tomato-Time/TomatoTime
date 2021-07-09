# Project Plan

Pod Members: **Susan Guerrero, Yuvia Leon, Nicholas de Souza**

## Problem Statement and description

As students, we know how difficult it can be to find effective study techniques that could carry through as habits. With constant distractions, students can find themselves drifting away from their tasks or study excessively for long periods of time. Both can be ineffective and contribute to unhealthy study habits which, can affect one's mental health. Our target audiences are students and individuals who work in an office-like setting who hope to improve their productivity, manage their distractions, maintain motivation, and decrease their mental fatigue.

## User Roles

-**Student:** a user who is seeking to improve their productivity and study habits.

-**Office Worker:** a user who is seeking to maintain motivation and decrease their mental fatigue.

## User Personas

-**Student:** 
  - Daniela is a 20 year old college student from New York studying computer science. Deadlines for assignments are coming up and midterm season is right around the corner. She's always been bad at managing her time, but now she wants to change that around.
  - Daniel is a 25 year old living in Los Angeles. He never finished high-school and so he's had to work odd jobs around the city. Recently, he's been going to his local library to study for his GED but he feels that it is very daunting with all the work he has to catch up on. 
  
-**Office Worker:** 
  - John is a 25 year old working at an investment banking firm in London. He's had to juggle multiple projects and is starting to feel stressed during his work hours. He wants to be more efficient with the time he spends on these projects so he can hopefully cut a couple of working hours from his day off.
  - Jane is a 43 year old living in NYC, working at an office. She spends most of her time sitting down and that's led to back problems. She's always prioritized working long hours but her doctor has recommended for her to take breaks a lot more frequently throughout the day. 

## User Stories

-**Student:** 

1. As a student, I want to use a website that has a timer with intervals for working and resting, so that I can be more productive when I study. (timer, intervals) 
2. As a student, I want to be able to have my own account in order to keep track of the Pomodoro cycles I complete so that I can see my progress over time. (register, sign in,  timer data)
3. As a student, I want to be reminded to take breaks, so that I don't get overwhelmed with my homework. (notifications) 
4. As a student, I want to be able to use the same Pomodoro timer with my friends, so that we could study together. (shareable link synchronized & unique url) 
5. As a student, I want to be able to keep a To-Do list of the assignments I have due so that I stay more organized. (to do list, adding, editing, deleting)

-**Office Worker:** 

1. As an office worker, I want to see the timer without having to switch tabs, so that I can stay focused while I work. (timer displayed in url) 
2. As an office worker, I want to track how much time I spend working each day so that I can have a good indicator of my productivity for each day. (Pomodoro stats) 
3. As an office worker, I want to be reminded discreetly to take breaks, so that I don't distract my co-workers (notifications) 
4. As an office worker, I want to be given the option to opt in or out of features (such as affirmations, or dark mode) so that I can customize what I use and remove features I don't need in order to keep my workspace uncluttered. (dark mode, affirmations and ability to submit your own affirmation, account settings tied to user) 
5. As an office worker, I want to be reminded to step away from my desk, so that I can reduce eye strain and be reminded to walk and stretch. (notifications) 
6. As an office worker, I want to have an option to continue working along with my timer, so that I can continue with my workflow. (flextime)

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
| id        | SERIAL | PRIMARY KEY a new countdown timer is created at 1/4 start|
| pomodoro | INTEGER | minutes user wants to work |
| short_break| INTEGER | minutes user wants their short break to be | 
| long_break | INTEGER | minutes user wants their long break to be | 
| user_id | INTEGER | REFERENCES users(id) ON DELETE CASCADE |
| day_logged | TIMESTAMP | only triggered once at the beginning of a session |

Model for countdown_timer_session: 

| **Column name** | **type** | **description** |
| :----         | :---:      | :---:         |
| minutes_logged | INTEGER | keeping track of time worked: updated after each focus period ends|
| user_id | INTEGER | REFERENCES countdown_timer(id) |




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
