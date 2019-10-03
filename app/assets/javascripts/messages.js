$(function(){
function buildHTML(message){
  var image = message.image ? `<img src="${message.image}">` : "";

  var html =`<div class="message-box">
              <div class="message-box__title">
                <p class="message-box__title__username">
                  ${message.user_name}
                </p>
                <p class="message-box__title__time">
                  ${message.created_at}
                </p>
              </div>
              <p class="message-box__message">
                ${message.content}
              </p>
                ${image}
             </div>`
  return html
}

function ScrollToBottom(){
  $('.main-view').animate({scrollTop: $('.main-view')[0].scrollHeight});
}

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      $('.submit-btn').prop( 'disabled', false );
      var html = buildHTML(data);
      $('.main-view').append(html);      
      $('#new_message')[0].reset();      
      ScrollToBottom();
    })
    .fail(function(){
      $('.submit-btn').prop( 'disabled', false );
      alert("エラー");
    });
  }); 
});