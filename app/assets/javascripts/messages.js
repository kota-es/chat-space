$(document).on('turbolinks:load', function(){
function buildHTML(message){
  var image = message.image ? `<img src="${message.image}">` : "";

  var html =`<div class="message-box" data-id="${message.id}">
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

  var reloadMessages = function(){
    if (location.pathname.match(/\/groups\/\d+\/messages/)){
    last_message_id = $('.message-box:last').data('id')
    $.ajax({
      url: 'api/messages',
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML +=  buildHTML(message);
        $('.main-view').append(insertHTML);
        ScrollToBottom()
      });
    })
    .fail(function(){
      alert('error')
    })
  }
}

  setInterval(reloadMessages, 5000);
});