module.exports = async ({ bot, Constants: { Colors } }, { serverDocument }, msg, commandData) => {
	if (!msg.suffix) {
		msg.channel.send({
			embed: {
				color: Colors.RED,
				description: `You need to provide a message for this alert!`,
			},
		});
	} else {
		const embedObj = {
			embed: {
				color: Colors.LIGHT_ORANGE,
				title: `Alert from ${msg.author.tag}`,
				description: `In #${msg.channel.name} (${msg.channel}) on **${msg.guild}**\n\`\`\`\n${msg.suffix}\`\`\``,
				thumbnail: {
					url: msg.author.displayAvatarURL(),
				},
			},
		};
		bot.messageBotAdmins(msg.guild, serverDocument, embedObj);
		msg.channel.send({
			embed: {
				color: Colors.LIGHT_GREEN,
				description: `I've alerted the admins about it! ⚠️`,
			},
		});
	}
};
