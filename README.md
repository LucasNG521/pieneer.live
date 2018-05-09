# Pieneer Live
Live Presentation made Interactive and Easy

## Group member

- [Didier Krux](https://github.com/didierkrux)
- [Ivan Oung](https://github.com/ivanoung)
- [Lucas Ng](https://github.com/LucasNG521)

## Project Map and Notes

[Trello Board](https://trello.com/b/8xI6rqJD/accelerator-cohort-module-2)

## Technology used

- AWS EC2 for hosting
- Node.js (express, passport, socket.io, redis, knex, ppt-png)
- Bootstrap
- JQuery
- Chart.js
- zwibbler? (canvas painting)

--- 

## version 0.1 May 6, 2018 (Ivan)

To establish update logs, adding packages like (Socket.io, passport, pg, knex and hbs). 
Already ran a test on using socket.io to update poll options, which the only thing that was left for the charts is to find a way to store the information of the table.

### Added

- npm install-ed
    - Chart.js
    - hbs
    - socket.io & socket.io-client
    - pg
    - knex
    - passport (local and facebook)
- Change log for the project
- Socket routes

### Changed

- Rerouting with viewRouter


## version 0.1 May 7, 2018 (Lucas)

Create table with knex

### Added

- npm dotenv
- migrations file 
    - presenter
    - presentation
    - pages
    - polls
    - result
    - q_a

## version 0.1 May 8, 2018 (Lucas)

database chang and added seeds file

### Added

- seeds 
    - all-table

### Changed

- migrations file (type)
    - presenter
    - presentation
    - pages
    - polls
    - result
    - q_a

## version 0.1 May 8, 2018 (Didier)

Refactorized the layout of the canvas, finished the tool kit for live-presentation, working on the next layout which will be where the presentor presents his/her poll selection.

### Added
### Changed
### Removed

## version 0.1 May 9, 2018 (Ivan)

Refactorized the layout of the canvas, finished the tool kit for live-presentation, working on the next layout which will be where the presentor presents his/her poll selection.

### Added
### Changed

- Adding more information into the seed flie for a more thorough testing env.

### Removed

## version 0.1 May 9, 2018 (Lucas)

### Added
- npm install
    - passport-linkedin
    - passport-google-oauth20

- passport.js
    - passport.use(facebook, google, linkedin)

- viewRoures.js
    -router passport (facebook, google, linkedin)

- html 
    - login
    - signup

### Problem
- passport-facebook/linkedin didn't work