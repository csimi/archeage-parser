const { types } = require('../lib/utils/types');

const {
	Damage,
	Recovery,
} = types;

module.exports = {
	'Crippling Mire': Damage,
	'Absorb Lifeforce': Recovery,
	'Cursed Thorns': Damage,
	'Boneyard': Damage,
	'Crow Attack': Damage,
	'Hell Spear': Damage,
	[`Death's Vengeance`]: Damage,
};
