# X app

Recreating the basic X app.

# What features

- Login / sign up page
- Account and sessions
- Post with likes and unliking
- A post should show the test and account
- Passkeys login and sign up

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
│    └── settings.json
│
├── data
│   └── database.db
│
└── src
    ├── server.js
    │
    ├── webauthn
    │   ├── authentication
    │   │   ├── get-options.js
    │   │   └── verify-response.js
    │   │   
    │   ├── registration
    │   │   ├── create-options.js
    │   │   └── verify-response.js
    │   │       
    │   └── sessions.js
    │       └── session.js
    │
    ├── data-base
    │   ├── account-challenge.js   
    │   ├── likes.js
    │   ├── passkeys.js    
    │   ├── posts.js
    │   ├── table.js
    │   └── users.js
    │
    ├── handlers
    │   ├── authentication.js    
    │   ├── delete-post.js
    │   ├── get-posts.js
    │   ├── like-unlike.js
    │   ├── post.js
    │   └── registration.js
    │
    ├── helper-functions
    │   ├── json-response.js   
    │   └── html-response.js
    │
    ├── public
    │   ├── authentication.js
    │   ├── registration.js        
    │   └── index.html
    │
    ├── routes
    │   └── table.js
    │
    └── view
```

# Notes for Devlopment

- The public key is not read right propbaly beacuase I am not sending it in the
  right format
- I need to uses generateAuthenticationOptions for login in

## Other Note

- I will need to chagne the branch from master to main at some point when I
  commit it

# What I still need to do

- get this passkeys debugged
- make sure options is deleted
- Have a quick learning session about what I can take away from it
- And look what docments I can use next time how would I do it next time
- put comments in the files I just need to the verifcation and data-base folder
- update the readme
- commit

# I don't really understand the promblem

- So thing are getting passed in the wrong format.
- So I should try and understad what need to get passed
- And in what format
- Then I need to get thoose things

## Notes

- Try and copy the UI exactly
- Have passkeys / login (not with a password)
