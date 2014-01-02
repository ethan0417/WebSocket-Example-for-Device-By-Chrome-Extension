$(function(){
  var background = chrome.extension.getBackgroundPage(),
      serverURL = 'http://' + background.server;
  // Click Even handler
  $('input[type=button]').on('click', function(e){
    console.log(e.target.id);
    var id = e.target.id;
    var name = $('#roomName').val();
    switch (id){
      case 'start':
        getRoom(name);
        break;
      case 'close':
        // TODO: 按下結束按鈕時，結束socket連線。
        break;
    };
  });
  // Greate WebSocked Room
  function getRoom(id){
    $.ajax({
      url: serverURL + '/' + id,
      success: function(data){
        if(data.status){
          background.init(id);
        }else{
          $('#error').html('開房時錯誤，請重新整理頁面再按開始！')
        };
      },
      error: function(data){
        $('#error').html(data);
      }
    })
  }
  /*
  // Random Room ID
  var maxNum = 9,
      minNum = 0,
      roomID = '';
  for( var i = 0; i< 4; i++){
    var n = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum,
    roomID = roomID + n;
  };
  */
});
//document.addEventListener('DOMContentLoaded', init);
