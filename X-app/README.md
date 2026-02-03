# X app

Recreating the basic X app.

# What features

- Login / sign up page
- Account and sessions
- Post with likes and unliking
- A post should show the test and account

# Stack / tools used

- sqlite database
- HTMX
- Deno
- JS

# Project structure

```txt
├── deno.json
├── deno.lock
├── README.md
│
├── .vscode
│       settings.json
│
├── data
│       database.db
│
└── src
    ├── server.js
    │
    ├── authentication
    │   └── session.js
    │
    ├── data-base
    │   ├── likes.js
    │   ├── posts.js
    │   ├── table.js
    │   └── users.js
    │
    ├── handlers
    │   ├── deletePost.js
    │   ├── getPosts.js
    │   ├── like-unlike.js
    │   ├── post.js
    │   └── register.js
    │
    ├── helper-functions
    │   └── htmlReponse.js
    │
    ├── public
    │   └── index.html
    │
    ├── routes
    │   └── table.js
    │
    └── view
```

# Notes for Devlopment

## Other Note

- I will need to chagne the branch from master to main at some point when I
  commit it

# What I still need to do

- delete post and get all post - login
- login api thing
- passkeys

## Notes

- Try and copy the UI exactly
- Have passkeys / login (not with a password)
