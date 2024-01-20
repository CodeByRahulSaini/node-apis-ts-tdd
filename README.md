# REST APIs for Note Application

RESTful APIs using Node.js which can serve as the backend for a simple note-taking application. They allow users to create an account, authenticate, and perform CRUD (Create, Read, Update, Delete) operations on their notes. Each note have a title, a body and a list of tags.

## Features

    - User Authentication & Authorization
    - Database Integration | MongoDB | Typegoose
    - Error Handling and Validations
    - Testing
    - Typescript
    - Rate Limiting | CORS | Helmet | Graceful Shutdown

## Install

    npm install

## Run the app

    npm run dev

Make sure you have valid `.env` file. You can take reference from `.env.sample`

## Run the tests

    npm run test

# REST APIs

### Login

`POST /auth/login`

    curl -v --location 'localhost:5001/api/auth/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "test@gmail.com",
        "password":"test1234"
    }'

Above API will return "Set-Cookie" in response headers which should be used in other APIs for authorization.

### Register

`POST /auth/register`

    curl --location 'localhost:5001/api/auth/register' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "name": "test",
        "email": "test@gmail.com",
        "password":"test1234"
    }'

### Refresh Token

`GET /auth/refresh`

    curl -v --location 'localhost:5001/api/auth/refresh' \
    --header 'Cookie: access_token=access_token_here; refresh_token=refresh_token_here'

Above API will return "Set-Cookie" in response headers which should be used in other APIs for authorization.

### Logout

`POST /auth/logout`

    curl --location 'localhost:5001/api/auth/logout'

### Get notes

`GET /notes`

    curl --location --request GET 'localhost:5001/api/notes/?search=work' \
    --header 'Content-Type: application/json' \
    --header 'Cookie: access_token=access_token_here; refresh_token=refresh_token_here'

### Add note

`POST /notes`

    curl --location 'localhost:5001/api/notes' \
    --header 'Content-Type: application/json' \
    --header 'Cookie: access_token=access_token_here; refresh_token=refresh_token_here'
    --data '{
        "title":"Note name",
        "body":"Note body",
        "tags": ["work"]
    }'

### Get note by id

`GET /notes/:id`

    curl --location 'localhost:5001/api/notes/note_id_here' \
    --header 'Cookie: access_token=access_token_here; refresh_token=refresh_token_here'

### Update note by id

`PUT /notes/:id`

    curl --location --request PUT 'localhost:5001/api/notes/note_id_here' \
    --header 'Content-Type: application/json' \
    --header 'Cookie: access_token=access_token_here; refresh_token=refresh_token_here' \
    --data '{
        "title":"New Note name",
        "body":"New Note body",
        "tags": ["office"]
    }'

### Delete note by id

`DELETE /notes/:id`

    curl --location --request DELETE 'localhost:5001/api/notes/note_id_here' \
    --header 'Cookie: access_token=access_token_here; refresh_token=refresh_token_here'

### Share note by id

`POST /notes/share/:id`

    curl --location 'localhost:5001/api/notes/share/note_id_here' \
    --header 'Content-Type: application/json' \
    --header 'Cookie: access_token=access_token_here; refresh_token=refresh_token_here' \

    --data '{
        "userId": "user_id_here"
    }'
