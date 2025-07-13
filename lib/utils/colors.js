const { types } = require('./types');

const {
	Damage,
	Health,
	Taken,
	Received,
	Recovery,
	Misc,
} = types;

const colors = {
	[Damage]: '#ff0000',
	[Health]: '#008000',
	[Taken]: '#0000ff',
	[Received]: '#90ee90',
	[Recovery]: '#800080',
	[Misc]: '#000000',
};

const getColor = (type) => {
	return colors[type] ?? colors[Misc];
};

module.exports = {
	colors,
	getColor,
};
