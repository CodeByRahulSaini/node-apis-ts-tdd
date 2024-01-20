# REST APIs for Note Application

## Install

    npm install

or

    yarn

## Run the app

    npm run dev

or

    yarn dev

## Run the tests

    npm run test

or

    yarn test

# REST API

The REST API to the example app is described below.

### Login

`POST /auth/login`

    curl --location 'localhost:5001/api/auth/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "test@gmail.com",
        "password":"test1234"
    }'

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

    curl --location 'localhost:5001/api/auth/refresh' \
    --header 'Cookie: access_token=access_token_here; refresh_token=refresh_token_here'

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

## Features

- Real-time collaboration on a shared board.
- Ability to draw free-form lines on the board.
- Undo and redo functionality.
- Private Rooms.

## Installation

```bash
  npm install
  npm run dev
```

or

```bash
  yarn
  yarn dev
```

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

or

```bash
  yarn test
```

## Demo

http://collaborative-board-frontend.vercel.app
