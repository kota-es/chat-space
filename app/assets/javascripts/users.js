$(document).on('turbolinks:load', function(){

  var user_list = $("#user-search-result");

  function appendUserName(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    
    $(user_list).append(html);
  }

  function NoUserName(){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">一致するユーザーが見つかりません</p
                </div>`
    
    $(user_list).append(html);
  }

  $("#user-search-field").on('keyup', function(){
    var input = $(this).val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { word: input },
      dataType: 'json'
    })
    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0){
        users.forEach(function(user){
          appendUserName(user);
        });
      }
      else{
        NoUserName()
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました')
    })
  });
});