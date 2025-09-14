const LineSplitter = require('./LineSplitter');
const { parseCombatEntry } = require('./EntryCategorizer');
const { types, reverseTypes } = require('./utils/types');
const ignore = require('../data/ignore');
const zoo = require('../data/zoo');

const {
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
	Loved,
	Hated,
	Loves,
	Hates,
} = types;

class LogParser {
	#sourceStream;
	
	#data = [];
	
	#statistics = new Map();
	
	constructor (sourceStream) {
		this.#sourceStream = sourceStream;
	}
	
	async parseData ({ useIgnore = false, noZoo = false } = {}) {
		const source = this.#sourceStream
			.pipeThrough(new TextDecoderStream())
			.pipeThrough(new LineSplitter());
		
		for await (const line of source) {
			const entry = parseCombatEntry(line);
			if (!entry) {
				continue;
			}
			
			this.#data.push(entry);
			const { name, type, action, amount, target } = entry;
			
			if (type === Misc) {
				// for now ignore misc
				continue;
			}
			
			if (type === Damage && name === target) {
				// what are you doing bro
				continue;
			}
			
			if (useIgnore && type === Damage && (
				ignore.includes(target) ||
				target?.includes(' ')
			)) {
				continue;
			}
			
			const data = this.getName(name);
			if (data && (!noZoo || type !== Damage || !zoo.includes(action))) {
				data[type][action] = (data[type][action] ?? 0) + amount;
			}
			
			const reverse = reverseTypes[type];
			if (reverse) {
				const targetData = this.getName(target);
				if (targetData) {
					targetData[reverse][action] = (targetData[reverse][action] ?? 0) + amount;
					targetData[type === Damage ? Hated : Loved][name] = (targetData[type === Damage ? Hated : Loved][name] ?? 0) + amount;
					if (data) {
						data[type === Damage ? Hates : Loves][target] = (data[type === Damage ? Hates : Loves][target] ?? 0) + amount;
					}
				}
			}
		}
		
		return Array.from(this.#statistics.values());
	}
	
	getName (name, create = true) {
		if (!name || name.includes(' ') || ignore.includes(name)) {
			return;
		}
		
		const key = name.toLowerCase();
		if (!this.#statistics.has(key)) {
			if (!create) {
				return;
			}
			this.#statistics.set(key, LogParser.createMemo(name));
		}
		
		return this.#statistics.get(key);
	}
	
	getType (type, count) {
		const data = Array.from(this.#statistics.values()).sort((a, b) => {
			return LogParser.sumAmount(b, type) - LogParser.sumAmount(a, type);
		});
		
		return data.slice(0, count).map((entry) => {
			return {
				'name': entry.name,
				[type]: LogParser.sumAmount(entry, type),
			};
		});
	}
	
	getData (count = Infinity) {
		return {
			[Damage]: this.getType(Damage, count),
			[Health]: this.getType(Health, count),
			[Mana]: this.getType(Mana, count),
			[Taken]: this.getType(Taken, count),
			[Received]: this.getType(Received, count),
			[Recovery]: this.getType(Recovery, count),
			[Buff]: this.getType(Buff, count),
			[Debuff]: this.getType(Debuff, count),
			[Movement]: this.getType(Movement, count),
			[Skill]: this.getType(Skill, count),
			[Misc]: this.getType(Misc, count),
			[Loved]: [],
			[Hated]: [],
			[Loves]: [],
			[Hates]: [],
		};
	}
	
	static createMemo (name) {
		return {
			name,
			[Damage]: {},
			[Health]: {},
			[Mana]: {},
			[Taken]: {},
			[Received]: {},
			[Recovery]: {},
			[Buff]: {},
			[Debuff]: {},
			[Movement]: {},
			[Skill]: {},
			[Loved]: {},
			[Hated]: {},
			[Loves]: {},
			[Hates]: {},
		};
	}
	
	static sumAmount (entry, property) {
		return Object.values(entry[property] ?? {}).reduce((memo, value) => memo + value, 0);
	}
}

module.exports = LogParser;
