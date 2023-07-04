const setupSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("New socket connection:", socket.id);

        // Handle cube position and rotation updates
        socket.on("cubeData", (data, room) => {
            // Broadcast the cube update to all sockets in the same room except the sender
            socket.to(room).emit("cubeData", data);
            console.log('room id: ', room);
        });

        // Join a room
        socket.on("joinRoom", (room) => {
            socket.join(room);
        });

        // Handle other socket events and functionality
        // ...

        // Handle socket disconnection
        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id);
            // Perform necessary cleanup or handling
        });
    });
};


module.exports = {
    setupSocket
};
