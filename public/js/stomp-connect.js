function getAccessToken() {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("access_token=")) {
      return cookie.substring("access_token=".length, cookie.length);
    }
  }
  return null; // Returnează null dacă nu se găsește token-ul
}

let stompClient;
stompClient = new StompJs.Client({
    brokerURL: "ws://localhost:8080/chat-app",
  connectHeaders: {
    token: getAccessToken(),
  },
});

stompClient.onConnect = (frame) => {
  setConnected(true);
  console.log("Connected: " + frame);
    stompClient.subscribe("/topic/notification-client/messages", (message) => {
    showMessages(JSON.parse(message.body).messageContent);
  });
};

stompClient.onWebSocketError = (error) => {
  window.location.href = "http://localhost:3000/authentication.html";
  console.error("Error with websocket", error);
};

stompClient.onStompError = (frame) => {
  console.error("Broker reported error: " + frame.headers["message"]);
  console.error("Additional details: " + frame.body);
};

function setConnected(connected) {
  $("#connect").prop("disabled", connected);
  $("#disconnect").prop("disabled", !connected);
  if (connected) {
    $("#conversation").show();
  } else {
    $("#conversation").hide();
  }
  $("#messages").html("");
}

function connect() {
  stompClient.activate();
}

function disconnect() {
  stompClient.deactivate();
  setConnected(false);
  console.log("Disconnected");
}

function sendMessage() {
  let message = $("#message");
  stompClient.publish({
    destination: "/app/chat",
    body: JSON.stringify({ messageContent: message.val() }),
  });
  message.val("");
}

// Funcția pentru afișarea mesajelor
function showMessages(message) {
  // Adăugarea mesajului la sfârșitul listei de mesaje
  $("#messages").append("<tr><td>" + message + "</td></tr>");

  // Facem scroll automat în jos pentru a menține ultimul mesaj vizibil
  var messageContainer = $("#messages");
  messageContainer.scrollTop(messageContainer.prop("scrollHeight"));
}

$(function () {
  $("form").on("submit", (e) => e.preventDefault());
  $("#connect").click(() => connect());
  $("#disconnect").click(() => disconnect());
  $("#send").click(() => sendMessage());
});
