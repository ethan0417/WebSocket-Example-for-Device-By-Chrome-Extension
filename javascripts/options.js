$(function(){
  var background = chrome.extension.getBackgroundPage(),
      qrImg = background.QRimgSrc,
      qrUrl = background.QRimgURL;
  $('#QRCode').attr('src', qrImg);
  $('#clientURL').html(qrUrl);
});
