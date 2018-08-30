const RegExpMaker = require("./RegExpMaker.js");
const snekfetch = require("snekfetch");
const { discord, tokens } = require("../../Configurations/auth.js");
const { gistKey } = tokens;

module.exports = class GitHubGist {
	constructor (bot) {
		this.bot = bot;
		this.public = gistKey === "";
		this.headers = {
			"User-Agent": "GAwesomeBot (https://github.com/GilbertGobbels/GAwesomeBot)",
			Accept: "application/json",
			"Content-Type": "application/json",
		};
		if (gistKey !== "") this.headers.Authorization = `Token ${gistKey}`;
		this.apiURL = "https://api.github.com/gists";
	}

	/**
	 * Uploads text to GitHub Gist
	 * @param {Object} [options] The text object
	 * @param {String} [options.title] Optional title for the Gist
	 * @param {String} options.text The content of the Gist
	 * @returns {Object} Object containing the id and the url to the Gist
	 */
	async upload ({ title = "", text, file = "text.md" } = {}) {
		const censor = [
			discord.clientSecret,
			discord.clientToken,
			tokens.discordList,
			tokens.discordBots,
			tokens.discordBotsOrg,
			tokens.giphyAPI,
			tokens.googleCSEID,
			tokens.googleAPI,
			tokens.imgurClientID,
			tokens.microsoftTranslation,
			tokens.twitchClientID,
			tokens.wolframAppID,
			tokens.openExchangeRatesKey,
			tokens.omdbAPI,
			tokens.gistKey,
		];
		const regExp = new RegExpMaker(censor).make("gi");
		let res;
		try {
			res = await snekfetch.post(this.apiURL).set(this.headers).send({
				description: `GAwesomeBot (${this.bot.user.tag} | ${this.bot.user.id})${title ? ` | ${title}` : ""}`,
				public: this.public,
				files: {
					[file]: {
						content: text.replace(regExp, "(╯°□°）╯︵ ┻━┻"),
					},
				},
			});
		} catch (err) {
			throw err;
		}
		return {
			id: res.body.id,
			url: res.body.html_url,
		};
	}

	async delete (id) {
		let res;
		try {
			res = await snekfetch.delete(`${this.apiURL}/${id}`).set(this.headers);
		} catch (err) {
			throw err;
		}
		return res.status === 204;
	}
};
