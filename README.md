Chatty App
=====================

A client-side SPA (single-page app) built with ReactJS, based on HTML and CSS. Contains a chat log displaying messages and notifications. Contains an input field to change name and input field to send messages.

This client-side app communicates with a server via WebSockets for multi-user real-time updates. No persistent database is involved; the focus is on the client-side experience.

### Usage

Clone this repo, install the dependencies, start the server:

```
cd react-simple-boilerplate
git remote rm origin
git remote add origin [YOUR NEW REPOSITORY]
# Manually update your package.json file
```

Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```
Then...
```
cd chatty_server
npm install
npm start
open http://localhost:3000
```

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)


### Screenshots

!['One user connected'](https://github.com/sahanah-ganesh/chatty/blob/master/docs/client%20connects.png)

!['Two users connected'](https://github.com/sahanah-ganesh/chatty/blob/master/docs/new%20client%20connects.png)

!['User changes name'](https://github.com/sahanah-ganesh/chatty/blob/master/docs/two%20users%20chatting.png)

!['User 2 leaves'](https://github.com/sahanah-ganesh/chatty/blob/master/docs/user%202%20leaves.png)


