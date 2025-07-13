const Overview = 'overview';
const Damage = 'damage';
const Health = 'health';
const Mana = 'mana';
const Taken = 'taken';
const Received = 'received';
const Recovery = 'recovery';
const Buff = 'buff';
const Debuff = 'debuff';
const Movement = 'movement';
const Skill = 'skill';
const Misc = 'misc';

const types = {
	Overview,
	Damage,
	Health,
	Mana,
	Taken,
	Received,
	Recovery,
	Buff,
	Debuff,
	Movement,
	Skill,
	Misc,
};

const typeNames = {
	[Overview]: 'Overview',
	[Damage]: 'Damage',
	[Health]: 'Healing',
	[Mana]: 'Mana',
	[Taken]: 'Damage Taken',
	[Received]: 'Healing Received',
	[Recovery]: 'Self Healing',
	[Buff]: 'Buffs',
	[Debuff]: 'Debuff',
	[Movement]: 'Movement',
	[Skill]: 'Skill',
	[Misc]: 'Miscellaneous',
};

const reverseTypes = {
	[Damage]: Taken,
	[Health]: Received,
};

const getTypeName = (type) => {
	return typeNames[type] ?? typeNames[Misc];
};

module.exports = {
	types,
	reverseTypes,
	getTypeName,
	Overview,
};
