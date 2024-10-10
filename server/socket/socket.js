import { Server } from "socket.io"
import express from "express"
import http from "http"

const app = express();
const server = http.createServer(app);
const userIdToSocketIdMap = {};
const socketIdToUserIdMap = {};
const io = new Server(server, {
    cors: {
        origin: ["https://gaurav-jobhunt.netlify.app","http://localhost:5173"],
        credentials: true,
        methods:["GET","POST"]
    }
})
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId !== undefined) {
        userIdToSocketIdMap[userId] = socket.id;
        socketIdToUserIdMap[socket.id] = userId;
    }
    console.log(`User connect ${socket.id}`);
    // console.log(socketIdToUserIdMap);

    socket.on("profile_view", (id) => {
        const socketIdOfWhosProfileIsViewed = userIdToSocketIdMap[id]
        const usrIdOfWhoViewedProfile = socketIdToUserIdMap[socket.id]
        io.to(socketIdOfWhosProfileIsViewed).emit("profile_view", usrIdOfWhoViewedProfile)
    })
    socket.on("status_changed", (status) => {
        const socketIdOfWhosProfileIsViewed = userIdToSocketIdMap[status.applicantId]
        io.to(socketIdOfWhosProfileIsViewed).emit("status_changed", status)
    })
})

const getRecieverId = (recieverId) => {
    return userIdToSocketIdMap[recieverId];
}
export { server, io, app, getRecieverId }