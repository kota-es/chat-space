json.content  @message.content
json.image  @message.image_url
json.created_at  @message.created_at.strftime("%Y/%m/%d %H:%M:%S")
json.user_name  @message.user.name
json.id @message.id