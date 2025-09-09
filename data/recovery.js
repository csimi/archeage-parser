const { types } = require('../lib/utils/types');

const {
	Recovery,
	Mana,
} = types;

module.exports = {
	'Healing Potion': Recovery,
	'Minor Healing Potion': Recovery,
	'Mana Potion': Mana,
	'Minor Mana Potion': Mana,
	'Health Regen Food': Recovery,
	'Earth Lunafrost': Recovery,
	[`Judge's Longing`]: Recovery,
	[`Enhanced Judge's Longing`]: Recovery,
	'Found Wild Ginseng!': Recovery,
	'Absorb Damage': Recovery,
	'Revitalizing Cheer': Recovery,
	'Sand Soulshard': Recovery,
	'Wind Soulshard': Recovery,
	'Lunar Soulshard': Recovery,
	[`Healer's Chalice`]: Recovery,
	'Orange Goblet of Honor': Recovery,
	'Conversion Shield': Recovery,
	'Flame Conversion Shield': Recovery,
	'Healing Grimoire': Recovery,
};
