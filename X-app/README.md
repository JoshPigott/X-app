# X app

Recreating the basic X app.

## What features

- Login / sign up page
- Account and sessions
- Post with likes and unliking
- Only the creator can delete the post.
- Passkeys login and sign up

## Screen shots

Authentication page
<br> ![auth page](./src/screenshots/auth-page.png)

Passkeys
<br> ![passkeys](./src/screenshots/passkeys.png)

Home page
<br> ![auth page](./src/screenshots/home-1.png)
![auth page](./src/screenshots/home-2.png)

## Requirements

- Install deno run `irm https://deno.land/install.ps1` | iex (for windows)

## How to run

- run `deno task start`
- Open browser enter this `http://localhost:8000/`

## Stack / tools used

- sqlite database
- HTMX
- Deno
- JS

## Project structure

```txt
├── .env
├── .gitignore
├── deno.json
├── deno.lock
├── passkeys-storage.txt
├── README.md
│
├── .vscode
│   ├── launch.json
│   └── settings.json
│
├── data
│   ├── .gitkeep
│   └── database.db
│
└── src
    ├── server.js
    │
    ├── database
    │   ├── connection.js
    │   ├── likes.js
    │   ├── passkeys.js
    │   ├── posts.js
    │   ├── schema.js
    │   ├── sessions.js
    │   └── users.js
    │
    ├── handlers
    │   ├── auth.js
    │   ├── is-login.js
    │   ├── like-unlike.js
    │   └── post.js
    │
    ├── middleware
    │   └── auth.js
    │
    ├── public
    │   ├── home.html
    │   ├── index.html
    │   ├── style.css
    │   │
    │   ├── assets
    │   │   └── profile-pic.png
    │   │
    │   └── scripts
    │       ├── authentication.js
    │       ├── check-if-login.js
    │       └── registration.js
    │
    ├── routes
    │   └── index.js
    │
    ├── screenshots
    │   ├── auth-page.png
    │   ├── home-1.png
    │   ├── home-2.png
    │   └── passkeys.png
    │
    ├── services
    │   ├── account-challenge.js
    │   ├── session.js
    │   │
    │   └── webauthn
    │       ├── authentication
    │       │   ├── get-options.js
    │       │   └── verify-response.js
    │       │
    │       └── registration
    │           ├── create-options.js
    │           └── verify-response.js
    │
    ├── utils
    │   ├── escape-html.js
    │   ├── get-time.js
    │   ├── html-response.js
    │   └── json-response.js
    │
    └── views
        ├── likes.js
        ├── list.js
        └── post-template.js
```

## Key logic

**Common flow**

- HTMX request → server routing → handler → database → HTML response.

**authentication and registration**

- User enters username and presses login
- Server checks if account exists in database
- If valid, authentication step begins
- User enters PIN
- Credentials are verified
- On success, user is logged in and a new session is created

**new post**

- User enters post content
- Post is created and stored in the database
- Post includes username, content, and likes
- New post is added to the UI post list

**like post**

- User presses like on a post
- Server finds post by ID in database
- Like count is incremented by one
- New value and unlike button return to UI

**delete post**

- Delete button is only visible to the post creator
- User presses delete
- Post is located and removed from the database
- Post HTML is removed from the UI

## known promblems

- passkeys take a long time
- Lacks a lot of features
- for you and following are just looks not function
