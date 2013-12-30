var wsUri = "ws://54.238.181.209:3000/wbsc/websocket";
var output;
function init() {
  console.log('start init function!');
  output = document.getElementById("output");
  testWebSocket();
}
/**
 * Connect Function 
 */
function testWebSocket() {
  websocket = new WebSocket(wsUri);
  websocket.onopen = function (evt) {
    console.log('open websocket success!!')
    onOpen(evt)
  };
  websocket.onclose = function (evt) {
    console.log('close websocket success!!')
  onClose(evt)
  };
  websocket.onmessage = function (evt) {
    console.log('get websocket message!!')
    onMessage(evt)
  };
  websocket.onerror = function (evt) {
    console.log('websocket error!!')
  onError(evt)
  };
}
/**
 *  Function
 */
function onOpen(evt) {
  writeToScreen("CONNECTED");
  doSend("WebSocket rocks");
}
function onClose(evt) {
  writeToScreen("DISCONNECTED");
}
function onMessage(evt) {
  //writeToScreen('<span style="color:blue;">RESPONSE:'+evt.data+'</span>');
  var window_height = window.innerHeight,
      window_width = window.innerWidth,
      tmp,
      new_height,
      new_width;
  tmp = evt.data.split(' ');
  console.log(tmp);
  new_width = window_width * Number(tmp[0]);
  new_height = window_height * Number(tmp[1]);
  $('.close').css('top', new_height).css('left', new_width);
  //websocket.close();
}
function onError(evt) {
  writeToScreen('<span style="color:red;">ERROR:</span>' + evt.data);
}
function doSend(message) {
  writeToScreen("SENT: " + message);
  websocket.send(message);
}
function writeToScreen(message) {
  var pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  output.appendChild(pre);
}

window.addEventListener("load", init, false);
