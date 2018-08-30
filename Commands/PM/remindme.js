const remind = require("../../Modules/MessageUtils/ReminderParser");
const moment = require("moment");

module.exports = async ({ bot, Constants: { Colors, Text } }, msg, commandData) => {
	const userDocument = msg.author.userDocument;
	if (msg.suffix) {
		const result = await remind(bot, userDocument, msg.suffix);
		if (result === "ERR") {
			msg.channel.send({
				embed: {
					color: Colors.INVALID,
					description: Text.INVALID_USAGE(commandData),
				},
			});
		} else {
			msg.channel.send({
				embed: {
					color: Colors.SUCCESS,
					description: `Alright, I'll remind you ${moment.duration(result).humanize(true)} ⏰`,
				},
			});
		}
	} else {
		const fields = [];
		userDocument.reminders.forEach(reminderDocument => {
			fields.push({
				name: `__${reminderDocument.name}__`,
				value: `${moment(reminderDocument.expiry_timestamp).toNow()}`,
				inline: true,
			});
		});
		if (userDocument.reminders.length === 0) {
			msg.channel.send({
				embed: {
					color: Colors.SOFT_ERR,
					title: "No reminders set 😴",
					description: `You don't have any reminders set yet; use \`${commandData.name} ${commandData.usage}\` to set one.`,
				},
			});
		} else {
			msg.channel.send({
				embed: {
					color: Colors.INFO,
					title: `Your reminders:`,
					fields,
				},
			});
		}
	}
};
