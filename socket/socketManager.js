let fnData;

module.exports= class socketLogic{

    constructor(io , socket){
        this.io = io,
        this.socket = socket
    }


    joinRoom(){
        fnData = this;
        console.log("in join room");

        
        
        // Handle cube position and rotation updates
        fnData.socket.on("cubeData", (data, room) => {
            console.log('cubeData------', data)
            // Broadcast the cube update to all sockets in the same room except the sender
            fnData.io.to(room).emit("cubeData", data);
            console.log('room id: ', room);
        });

        // Join a room
        fnData.socket.on("joinRoom", (room) => {
            fnData.socket.join(room);
        });
    }

}