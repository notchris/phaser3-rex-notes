var OnJoinRoom = function (config) {
    this.roomID = config.roomID;
    this.roomName = config.roomName;
    this.roomType = config.roomType;

    this.userList.startUpdate();
}

export default OnJoinRoom;