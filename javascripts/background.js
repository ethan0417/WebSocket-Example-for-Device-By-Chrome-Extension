var server = "extcontrol.arecord.us:3000";
var prefix = "/multiplex";
var serverURL = 'http://'+server;
var wsUri =  serverURL + prefix;
var QRimgURL;
var QRimgSrc;

function init() {
  var roomID = randomFn();
  getRoom(roomID, function(){
    testWebSocket(roomID);
    QRimgURL = serverURL +'/'+roomID+'/client';
    QRimgSrc = QRCode(QRimgURL , 240, 240);
  });
}
/**
 * Connect Function 
 */
function testWebSocket(roomName) {
  websocket = new SockJS(wsUri);
  var multiplexer = new WebSocketMultiplex(websocket);
  var ann  = multiplexer.channel(roomName);
  ann.onopen = function (evt) {
    onOpen(evt)
  };
  ann.onclose = function (evt) {
    onClose(evt)
  };
  ann.onmessage = function (evt) {
    onMessage(evt)
  };
  ann.onerror = function (evt) {
    onError(evt)
  };
}
/**
 *  Random room ID
 */
function randomFn(){
  var maxNum = 9,
      minNum = 0,
      ID = '';
  for( var i = 0; i< 4; i++){
    var n = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum,
    ID = ID + n;
  };
  return ID;
}
/**
 *  QR code Fn
 */
function QRCode(content, width, height){
  width = !!width ? width : 240;
  height = !!height ? height : 240;
  content = encodeURIComponent(content);
  return 'http://chart.apis.google.com/chart?cht=qr&chl=' + content + '&chs=' + width + 'x' + height;
}

/**
 *  Create service room
 */
function getRoom(id, callback){
  // Random Room ID
  $.ajax({
    url: serverURL + '/' + id,
    success: function(data){
      if(data.status){
        callback();
      }else{
        alert('crate room error');
      };
    },
    error: function(data){
      alert(data);
    }
  })
}
/**
 *  Socket handler function
 */
function onOpen(evt) {
}
function onClose(evt) {
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
    chrome.tabs.sendMessage(tab[0].id, { x: getWidth , y: getHeight });
  });
}
function onError(evt) {
}
function openOrFocusOptionsPage() {
  var optionsUrl = chrome.extension.getURL('options.html'); 
  chrome.tabs.query({}, function(extensionTabs) {
    var found = false;
    for (var i=0; i < extensionTabs.length; i++) {
      if (optionsUrl == extensionTabs[i].url) {
        found = true;
        chrome.tabs.update(extensionTabs[i].id, {"selected": true});
      };
    };
    if (found == false) {
      chrome.tabs.create({url: "options.html"});
    };
  });
}

chrome.browserAction.onClicked.addListener(function(tab){
  openOrFocusOptionsPage();
  init();
});
