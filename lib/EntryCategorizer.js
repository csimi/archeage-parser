const {
	//Damage,
	Health,
	Mana,
	Recovery,
	/**
	 * Buff,
	 * Movement,
	 * Skill,
	 */
	Misc,
} = require('../data/types');
const Archery = require('../data/archery');
const Auramancy = require('../data/auramancy');
const Battlerage = require('../data/battlerage');
const Defense = require('../data/defense');
const Gunslinger = require('../data/gunslinger');
const Items = require('../data/items');
const Malediction = require('../data/malediction');
const Occultism = require('../data/occultism');
const Recover = require('../data/recovery');
const Shadowplay = require('../data/shadowplay');
const Songcraft = require('../data/songcraft');
const Sorcery = require('../data/sorcery');
const Spelldance = require('../data/spelldance');
const Swiftblade = require('../data/swiftblade');
const Vitalism = require('../data/vitalism');
const Witchcraft = require('../data/witchcraft');

const Actions = {
	...Archery,
	...Auramancy,
	...Battlerage,
	...Defense,
	...Gunslinger,
	...Items,
	...Malediction,
	...Occultism,
	...Recover,
	...Shadowplay,
	...Songcraft,
	...Sorcery,
	...Spelldance,
	...Swiftblade,
	...Vitalism,
	...Witchcraft,
};

const RemoveBracket = {
	'[Dance] Dance of Hope': 'Dance of Hope',
	'[Perform] Ode to Recovery': 'Ode to Recovery',
	'Bleeding (Rank 1)': 'Bleeding',
};

const parseCombatEntry = (line) => {
	const [, name, ...parts] = line.slice(1).split('|');
	if (!name) {
		return null;
	}
	
	const entry = {
		'name': name.slice(8),
		'type': Misc,
		'target': null,
		'action': null,
		'amount': 0,
	};
	
	const data = parts.join('|');
	
	const amountIndex = data.indexOf('cff9be85a');
	if (amountIndex !== -1) {
		const amountEnd = data.indexOf('|', amountIndex);
		entry.amount = Number(data.slice(amountIndex + 9, amountEnd));
	}
	else {
		const damageIndex = data.indexOf('cffc13d36');
		if (damageIndex !== -1) {
			const damageEnd = data.indexOf('|', damageIndex);
			entry.amount = Number(data.slice(damageIndex + 10, damageEnd));
		}
	}
	
	const actionIndex = data.indexOf('cff57d6ae');
	if (actionIndex !== -1) {
		const actionEnd = data.indexOf('|', actionIndex);
		entry.action = data.slice(actionIndex + 9, actionEnd);
	}
	
	const targetIndex = data.indexOf('r targeted');
	if (targetIndex !== -1) {
		const targetEnd = data.indexOf('|', targetIndex);
		entry.target = data.slice(targetIndex + 11, targetEnd);
	}
	
	entry.type = Actions[entry.action] || entry.type;
	if (data.includes('r to restore') && entry.type !== Recovery) {
		entry.type = data.endsWith('mana.') ? Mana : Health;
	}
	
	entry.action = RemoveBracket[entry.action] || entry.action;
	
	return entry;
};

module.exports = {
	parseCombatEntry,
};
