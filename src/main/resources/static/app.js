var stompClient = null;
function connect() {
    stompClient = new window.StompJs.Client({
        webSocketFactory: function () {
            return new WebSocket("ws://localhost:8080/websocket");
        }
    });
    stompClient.onConnect = function (frame) {
        frameHandler(frame)
    };
    stompClient.onWebsocketClose = function () {
        onSocketClose();
    };

    stompClient.activate();
}

function onSocketClose() {
    if (stompClient !== null) {
        stompClient.deactivate();
    }
    setConnected(false);
    console.log("Socket was closed. Setting connected to false!")
}

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#connectSockJS").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#responses").show();
    } else {
        $("#responses").hide();
    }
    $("#messages").html("");
}

function connectSockJs() {
            stompClient = new window.StompJs.Client({
                webSocketFactory: function () {
                    return new window.SockJS("http://localhost:8080/sockjs");
                }
            });
            stompClient.onConnect = function (frame) {
                frameHandler(frame)
            };
            stompClient.onWebsocketClose = function () {
                onSocketClose();
            };

            stompClient.activate();
        }

function frameHandler(frame) {
    setConnected(true);
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/messages', function (message) {
        showMessage(message.body);
    });
}

function showMessage(message) {
    var msg = JSON.parse(message);
    $("#responses").prepend("<tr>" +
        "<td class='timeStamp'>" + msg['timeStamp'] + "</td>" +
        "<td class='from'>" + msg['from'] + "</td>" +
        "<td>" + msg['message'] + "</td>" +
        "</tr>");
}

function sendMessage() {
    stompClient.publish({
        destination:"/app/send",
        body: JSON.stringify({
            'from': $("#from").val(),
            'message': $("#message").val()
        })
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.deactivate();
    }
    setConnected(false);
    console.log("Disconnected");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $("#connect").click(function () {
        connect();
    });
    $("#connectSockJS").click(function () {
        connectSockJs();
    });
    $("#disconnect").click(function () {
        disconnect();
    });
    $("#send").click(function () {
        sendMessage();
    });
    $("document").ready(function () {
        disconnect();
    });
});