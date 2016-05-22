#Infinite Scroll App

Uses Dribbble API to retrieve images of projects. Displays them. Alows user to favourite the projects (saves data to local storage of the browser);

##Instructions

Get all dependancies `npm install`.

You'll need to add Dribbble API key to the app. Do this by `gulp init --access_token=[your-access-token]`. This will rename *_settings.example* to *_settings.js* and add API token to it.

Finally run local server `gulp`.

##Notes

This was a very exciting task indeed. I had fun fiddling with Vanilla JavaScript. Comming from a cosiness of AngularJS it was both a cold shower and a nice cool breeze on a hot day.

It definitely felt great to make all decisions by myself and be responsible for them.

##Todo

- Set up a build [x]
  - SCSS [x]
  - Babel (ES6 here I come!) [ ]
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