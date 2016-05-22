#Infinite Scroll App

Uses Dribbble API to retrieve images of projects. Displays them. Alows user to favourite the projects (saves data to local storage of the browser);

##Instructions

Get all dependancies `npm install`.

Run local server `gulp`.

You will also need to rename *_settings.example* to *_settings.js* and add your Dribbble API access_token to it.

##Todo

- Set up build system [x]
  - SCSS [x]
  - Babel (ES6 here I come!) [x]
  - Browsersync [x]
  - Concatenation (CSS and JS) [x]
- Hit the API at `https://api.dribbble.com/v1/shots` [x]
- Lazy-load images [x]
- Use responsive image solution (load 2x images only when needed) [x]
- Infinite scroll (load more images) [x]
- Recreate responsive design [x]
  - 3 breakpoints [x]
- Ability to favourite shot (saves shot id to local storage) [x]
- Enforce Airbnb or Github code style [x]

##Goals

I want this app to act as a module that can be added to any webapp easily.