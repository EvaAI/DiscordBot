module.exports = {
  getInfo: function () {
    var info = {
      'name': 'reply',
      'permissionLevel': 'everyone',
      'man': 'Replies to your message'
    }
    return info
  },
  command: function (msg, params) {
    var replyEmbed = {
      'embed': {
        'title': 'Reply to your message',
        'color': 0xffb6c1,
        'thumbnail': {
          'url': msg.client.user.avatarURL
        },
        'description': `Hi!`,
        'timestamp': new Date().toISOString(),
        'footer': {
          'text': `${msg.author.tag}`,
          'icon_url': msg.client.user.avatarURL
        }
      }
    }
    msg.channel.send(replyEmbed)
  }
}
