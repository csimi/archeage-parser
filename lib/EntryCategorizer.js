const {
	Damage,
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
const Vitalism = require('../data/vitalism');
const Spelldance = require('../data/spelldance');
const Songcraft = require('../data/songcraft');
const Items = require('../data/items');
const Recover = require('../data/recovery');

const Actions = {
	...Vitalism,
	...Spelldance,
	...Songcraft,
	...Items,
	...Recover,
};

const RemoveBracket = {
	'[Dance] Dance of Hope': 'Dance of Hope',
	'[Perform] Ode to Recovery': 'Ode to Recovery',
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
