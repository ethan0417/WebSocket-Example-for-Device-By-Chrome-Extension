var server = "211.78.254.40:3001";
var wsUri =  'ws://'+ server + "/wbsc/websocket";
function init() {
  console.log('start init function!');
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
  //writeToScreen("CONNECTED");
  doSend("WebSocket rocks");
}
function onClose(evt) {
  //writeToScreen("DISCONNECTED");
}
function onMessage(evt) {
  var tmp,
      getWidth,
      getHeight;
  tmp = evt.data.split(' ');
  getWidth = Number(tmp[0]);
  getHeight = Number(tmp[1]);
  // Send server X and Y data to contentScript.js
  chrome.tabs.query({active:true, currentWindow:true}, function(tab){
    console.log('background send message to contentScript : ')
    console.log({ x: getWidth , y: getHeight })
    chrome.tabs.sendMessage(tab[0].id, { x: getWidth , y: getHeight });
  });
}
function onError(evt) {
  //writeToScreen('<span style="color:red;">ERROR:</span>' + evt.data);
}
function doSend(message) {
  //writeToScreen("SENT: " + message);
  websocket.send(message);
}

chrome.browserAction.onClicked.addListener(init);
