#Infinite Scroll App

Uses Dribbble API to retrieve images of projects. Displays them. Alows user to favourite the projects (saves data to local storage of the browser);

##Todo

- Set up build system [x]
  - SCSS [x]
  - Babel (ES6 here I come!) [x]
  - Browsersync [x]
  - Concatenation (CSS and JS) [x]
- Hit the API at `https://api.dribbble.com/v1/shots`
- Lazy-load images
- Use responsive image solution (load 2x images only when needed)
- Infinite scroll (load more images)
- Recreate responsive design
  - 3 breakpoints
- Ability to favourite shot (saves shot id to local storage)
- Enforce Airbnb or Github code style

##Goals

I want this app to act as a module that can be added to any webapp easily.