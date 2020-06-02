Heroku-hosted api for the [food and writing website](https://github.com/wadada-design/foodandwriting-site).

## Folder structure

### app

Files necessary for running the app. Including controllers, models, routes etc.

### config

Config variables from the .env file to avoid `process.env.EXAMPLE_VAR` from showing up throughout.

### db

Database configuration.

### helpers

Pre-configured helper functions for use within the services directory.

### scripts

Helper scripts mostly for use in development.

### services

Main logic used within controllers.

### static

Static files used within views.

### views

Templates for emails and pages using `pug`.
