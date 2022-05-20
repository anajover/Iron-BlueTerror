# Iron Blue Terror

## Description

Create, edit or view your favourites terror movies.
 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can create and edit my own movies
- **login** - As a user I want to be able to log in on the webpage so that I can get and edit my profile section and favourites
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **movie-list-results** - As a user I want to see all the movies listed on the webpage
- **movie-create-form** - As a user I want to create, edit and delete my own movies
- **user-profile** - As a user I want to see and edit my profile page.
- **favorites-add-remove** - As a user I want to add movies to my favourites and remove it.
- **my-created-movies-list** - As a user i want a list of all the movies created by me.

## Backlog

List of other features outside of the MVPs scope

User profile:
- see my profile
- upload my profile picture
- create a movie
- see my favourites movies
- see the list of movies created by me

Movies List:
- Edit or delete the movies created by me. 
- See the user who has created the movie.





## ROUTES:

- GET / 
  - renders the homepage

- GET /auth/signup
  - redirects to / if user logged in
  - renders add-signup.hbs

- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - profile image
    - username
    - name
    - email
    - password
    - city
    - birthday
    - about me
    - favourites
    

- GET /auth/login
  - redirects to / if user logged in
  - renders the login form

- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - email
    - password

- POST /auth/logout
  - body: (empty)

- GET /
  - renders homepage.hbs

- GET /movies
  - renders movies/main.hbs

GET /movies/list
  - renders movies/list.hbs
  - redirects to movies/movie-details.hbs

GET /movies/create
  - renders movies/new-movies.hbs

- POST /movies/create 
  - redirects to /movies/list
  - body: 
    - cover
    - title
    - director
    - cast
    - plot
    - year
    - owner

- GET /movies/:id/edit
  - renders movies/edit-movie.hbs
  
- POST /movies/:id/edit 
  - redirects to /movies/:id
  - body: 
    - cover
    - title
    - director
    - cast
    - plot
    - year
    - owner

- GET /movies/:movieId
  - renders movies/movie-details.hbs

- POST /movies/:id/delete
  - redirect to /movies/:userId/createdList

- GET /signup
  - renders auth/signup.hbs

- POST /signup
  - redirect to /auth/login
  - body:
    - username
    - email
    - password

- GET /login
  - renders auth/login.hbs

- POST /login
  - redirect to /profile

- POST /logout
  - redirect to /

- GET /
  - renders profile/index.hbs

- GET /edit
  - renders profile/edit.hbs

- POST /edit
  - redirect to /profile
  - body:
    - image
    - username
    - email
    - name
    - city
    - birthYear
    - aboutMe

POST /favorites/:movieId
  - renders profile/favorites.hbs

GET /favorites
  - renders profile/favorites.hbs


## Models

- User model
  
  - username:
    - type: String
    - unique: true
    - required: true
  
  - password:
    - type: String
    - required: true
  
  - image:
    - type: String
  
  - name:
    - type: String

  - email:
    - type: String
    - unique: true
    - required: true
  
  - city:
    - type: String
  
  - birthYear: 
    - type: Date
  
  - aboutMe: 
    - type: String
  
  - favorites: 
    - type: [Schema.Types.ObjectId]
    - ref: "Movie"
  
- Event model

  - cover:
    - type: String
  
  - title: 
    - type: String
  
  - director: 
    - type: String
   
  - cast: [String]
  
  - plot: 
    - type: String
    
  - year: 
    - type: Number
    
  - owner: 
    - type: Schema.Types.ObjectId
    - ref: "User"

## Backlog

- Admin User

- Previsualization of the trailers

- Default profile Images

- Videogames and books sections based on terror, too.

- Comments and reviews


## Links

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/anajover/Iron-BlueTerror.git)

[Deploy Link](https://iron-blue-terror.herokuapp.com/)

### Slides

[Slides Link](https://docs.google.com/presentation/d/13hLG70S4yx-251vy_jAvABHxQ1-wHMQrRjAdBULl0GY/edit?usp=sharing)
