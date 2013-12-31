$(function(){
  var maxNum = 9,
      minNum = 0,
      roomID = '',
      background = chrome.extension.getBackgroundPage(),
      serverURL = 'http://127.0.0.1:3008'
  // Greate WebSocked Room
  function getRoom(id){
    $.ajax({
      url: serverURL + '/reserve/' + id,
      success: function(data){
        if(data.status !== 'ok')
          $('#error').html('開房時錯誤，請重新整理頁面再按開始！')
      },
      error: function(data){
        $('#error').html(data);
      }
    })
  }
  // Random Room ID
  for( var i = 0; i< 4; i++){
    var n = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum,
    roomID = roomID + n;
  };
  console.log(roomID);
  // Display Room ID
  $('#roomID').html(roomID);
  // Click Even handler
  $('input').on('click', function(e){
    console.log(e.target.id);
    var id = e.target.id;
    switch (id){
      case 'start':
        getRoom(roomID);
        break;
      case 'close':
        break;
    };
  });

});
//document.addEventListener('DOMContentLoaded', init);
