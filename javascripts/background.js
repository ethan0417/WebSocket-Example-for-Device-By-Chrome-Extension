var server = "211.78.254.40:9999";
var prefix = "/multiplex";
var wsUri =  'http://'+ server + prefix;


function init(roomName) {
  console.log('start init function!');
  testWebSocket(roomName);
}
/**
 * Connect Function 
 */
function testWebSocket(roomName) {
  websocket = new SockJS(wsUri);
  var multiplexer = new WebSocketMultiplex(websocket);
  var ann  = multiplexer.channel(roomName);
  ann.onopen = function (evt) {
    console.log('open websocket success!!')
    onOpen(evt)
  };
  ann.onclose = function (evt) {
    console.log('close websocket success!!')
    onClose(evt)
  };
  ann.onmessage = function (evt) {
    onMessage(evt)
  };
  ann.onerror = function (evt) {
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
function openOrFocusOptionsPage() {
  var optionsUrl = chrome.extension.getURL('options.html'); 
  chrome.tabs.query({}, function(extensionTabs) {
    var found = false;
    for (var i=0; i < extensionTabs.length; i++) {
      if (optionsUrl == extensionTabs[i].url) {
        found = true;
        console.log("tab id: " + extensionTabs[i].id);
        chrome.tabs.update(extensionTabs[i].id, {"selected": true});
      };
    };
    if (found == false) {
      chrome.tabs.create({url: "options.html"});
    };
  });
}
//chrome.browserAction.onClicked.addListener(init);
chrome.browserAction.onClicked.addListener(function(tab){
  openOrFocusOptionsPage();
});
