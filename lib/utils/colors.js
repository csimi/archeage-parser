const { types } = require('./types');

const {
	Damage,
	Health,
	Taken,
	Received,
	Recovery,
	Loved,
	Hated,
	Loves,
	Hates,
	Misc,
} = types;

const colors = {
	[Damage]: '#ff0000',
	[Health]: '#008000',
	[Taken]: '#0000ff',
	[Received]: '#90ee90',
	[Recovery]: '#800080',
	[Loved]: '#00ff00',
	[Hated]: '#ff8000',
	[Loves]: '#00ff00',
	[Hates]: '#ff8000',
	[Misc]: '#000000',
};

const getColor = (type) => {
	return colors[type] ?? colors[Misc];
};

module.exports = {
	colors,
	getColor,
};
