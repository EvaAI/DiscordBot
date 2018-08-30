module.exports = class Utils {
	constructor () {
		throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
	}

	/**
   * Resolves a string or array to a string.
   * @param {String|Array} data The string resolvable to resolve
   * @returns {String}
   */
	static resolveString (data) {
		if (typeof data === "string") return data;
		if (data instanceof Array) return data.join("\n");
		return String(data);
	}

	/**
   * Can be a Hex Literal, Hex String, Number, RGB Array, or one of the following
   * ```
   * [
   *   'DEFAULT',
   *   'AQUA',
   *   'GREEN',
   *   'BLUE',
   *   'PURPLE',
   *   'GOLD',
   *   'ORANGE',
   *   'RED',
   *   'GREY',
   *   'DARKER_GREY',
   *   'NAVY',
   *   'DARK_AQUA',
   *   'DARK_GREEN',
   *   'DARK_BLUE',
   *   'DARK_PURPLE',
   *   'DARK_GOLD',
   *   'DARK_ORANGE',
   *   'DARK_RED',
   *   'DARK_GREY',
   *   'LIGHT_GREY',
   *   'DARK_NAVY',
   *   'RANDOM',
   * ]
   * ```
   * or something like
   * ```
   * [255, 0, 255]
   * ```
   * for purple
   * @typedef {String|Number|Array} ColorResolvable
   */

	static resolveColor (color) {
		if (typeof color === "string") {
			if (color === "RANDOM" || color.toLowerCase() === "random") return Math.floor(Math.random() * (0xFFFFFF + 1));
			color = Utils.Colors[color] || parseInt(color.replace("#", ""), 16);
		} else if (color instanceof Array) {
			color = (color[0] << 16) + (color[1] << 8) + color[2];
		}

		if (color < 0 || color > 0xFFFFFF) {
			throw new RangeError(`The color isn't in the range of 0x000000 - 0xFFFFFF`);
		} else if (color && isNaN(color)) {
			throw new TypeError(`Color isn't a number.`);
		}

		return color;
	}
};

exports.Colors = {
	DEFAULT: 0x000000,
	AQUA: 0x1ABC9C,
	GREEN: 0x2ECC71,
	BLUE: 0x3498DB,
	PURPLE: 0x9B59B6,
	GOLD: 0xF1C40F,
	ORANGE: 0xE67E22,
	RED: 0xE74C3C,
	GREY: 0x95A5A6,
	NAVY: 0x34495E,
	DARK_AQUA: 0x11806A,
	DARK_GREEN: 0x1F8B4C,
	DARK_BLUE: 0x206694,
	DARK_PURPLE: 0x71368A,
	DARK_GOLD: 0xC27C0E,
	DARK_ORANGE: 0xA84300,
	DARK_RED: 0x992D22,
	DARK_GREY: 0x979C9F,
	DARKER_GREY: 0x7F8C8D,
	LIGHT_GREY: 0xBCC0C0,
	DARK_NAVY: 0x2C3E50,
	BLURPLE: 0x7289DA,
	GREYPLE: 0x99AAB5,
	DARK_BUT_NOT_BLACK: 0x2C2F33,
	NOT_QUITE_BLACK: 0x23272A,
};
