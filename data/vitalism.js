const { types } = require('../lib/utils/types');

const {
	Damage,
	Health,
	Skill,
} = types;

module.exports = {
	'Antithesis': Damage,
	'Resurgence': Health,
	'Life Skewer': Health,
	'Mend': Health,
	'Fervent Healing': Health,
	'Gradual Recovery': Health,
	'Healing Circle': Health,
	'Revive': Skill,
	'Mana Barrier': Skill,
};
