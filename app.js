const express = require('express');
const router = require('./router/router');
const { Chat } = require('./model');
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    socket.on('join', (userId) => {
        console.log("User joined room with ID:", userId);
        socket.join(userId);
    });

    socket.on("newMess", async ({ message, userId, friendId }) => {
        console.log("New message received:", { message, userId, friendId });

        try {
            await Chat.create({ from: userId, to: friendId, message });
            console.log("Message saved to DB.");
        } catch (error) {
            console.error("Error saving message:", error);
        }
    });

    socket.on('showMess', async ({ userId, fId }) => {
        try {   
            console.log("Fetching messages for user:", userId, "and friend:", fId);
            const chat = await Chat.find({
                $or: [
                    { from: userId, to: fId },
                    { from: fId, to: userId }
                ]
            });
            console.log("Messages found:", chat);
            socket.emit('getMess', chat);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    });
});


app.set("view engine", "hbs");
require("hbs").registerPartials(__dirname + "/views/component");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

server.listen(8080)