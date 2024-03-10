### How to launch the application

1. Launch the mongo db server with the help of docker compose with the command
`docker compose up`
This launches mongo db configured exactly how the application will expect it to be for the proper functioning of the application.

2. in a different terminal, `cd server` and run `npm run dev`
this should launch the dev script in the package.json that runs `nodemon server.js` under the hood. If all goes well, we should see the message `Established a connection to the database` in the terminal.

3. In a different terminal, `cd client` and run `npm run dev`
This should launch the react app ready for testing in the browser.