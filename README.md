# Movie catalog project

## Motivation
This project allows users to see a movie list. Logged-in users can add new movies to the list, edit their movies and delete them. Anyone can read the details about a specific movie they like.

## Features
    - Features 4 dynamic pages that fetch data from the back-end server, allowing their content to change according to
    the application state (excluding login and register).
    - Includes pages for listing movies and movie details.
    - Communicate to a remote service via REST.
    - All CRUD (create, read, update, delete) operations are implemented.
    - Has 8 routers (excluding the error page).
    - Has error handling and data validation to avoid crashes.
    - Has public and private parts. The private parts can only be accessed by logged-in users.

## How to install

```sh
git clone git@github.com:anatoliy-bezmenov/movie-catalog.git
```

```sh
cd movie-catalog
```

### Rest API Server
Open a terminal and run

```sh
cd movies-rest-server
npm install
npm run start
```

After having successfully started the server, the server will start running on port 4000 and a database called "movies" will be created, which will store 2 collections. One called "movies" and another one called "users".

### Vue.js Web Application
Open another terminal and run

```sh
cd vue-project
npm install
npm run dev
```

### Open with browser
http://localhost:5173

![image](https://github.com/user-attachments/assets/72078bfa-f3e4-4cd2-a706-23f365963bef)
