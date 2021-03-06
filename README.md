# BEC Angular training HTTP Client Demo App

This is a demo application showing how to use the HttpClient service and Observables in Angular 6.

# What's in here

- backend.js - a simple Express app which acts as the back-end API.
- src/app/ - this folder contains the Angular app
- config/ - this folder contains webpack-related scripts

# Running the app

To run this application, you need NodeJS and NPM installed on your system.
Then, run the following commands from separate command prompts:

```
node backend.js
ng serve
```

This will transpile the TypeScript files, and start the Node server.
The app will be available at [http://localhost:4200/](http://localhost:4200/)
The REST backend will be available at [http://localhost:3000/](http://localhost:3000/)
