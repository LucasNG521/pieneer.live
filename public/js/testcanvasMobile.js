$(() => {
    const socket = io('/testroom');

    $(".vote-button").click(function () {
        console.log("Mobile vote");
        socket.emit("vote");
    });
});