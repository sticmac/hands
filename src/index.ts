import express from "express";
import path from "path";
import { Server } from "socket.io";
import http from "http";

const subPath = process.env.SUB_PATH || '';

const app = express();
const port = process.env.PORT || 8080; // default port to listen
const server = http.createServer(app);

const io = new Server(server);

// Configure Express to use EJS
app.set("views", path.join( __dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    // render the index template
    res.render( "index", {subPath} );
} );

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    // recieve hand message
    socket.on('hand', (username) => {
        io.emit('hand', username);
    })
});

// start the express server
server.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
