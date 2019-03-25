# MERN Auth App

## Features
- Fullstack user auth using JWTs and Passport.js
- Dynamic SPA with React.js
- Frontend routing with React Router
- Timed token expiration and user logout

## How to Use
- clone or download this repository
- locally, navigate to the `server` directory
- run `npm run install-all` in the terminal
- navigate to `http://localhost:8080` in your browser
- you're all set!

## Future Improvements
- implement OAuth with LinkedIn
- design frontend for mobile browsers
- add styling
- add redux for scaling to full-sized app
- add testing
- abstract private frontend routing logic into PrivateRoute component
- wrap jsx in SessionForm in a form tag to get submit behavior out of the box
- switch JWT storage from localStorage to cookie (+ setup CSRF protection) to prevent XSS attacks
