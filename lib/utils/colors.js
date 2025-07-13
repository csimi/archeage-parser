const {
	Damage,
	Health,
	Mana,
	Recovery,
	Buff,
	Movement,
	Skill,
	Misc,
} = require('../../data/types');

const colors = {
	[Damage]: '#ff0000',
	[Health]: '#008000',
	[Mana]: '#0000ff',
	[Recovery]: '#800080',
	[Buff]: '#000000',
	[Movement]: '#000000',
	[Skill]: '#000000',
	[Misc]: '#000000',
};

module.exports = function getColor (type) {
	return colors[type] ?? colors[Misc];
};
