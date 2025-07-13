const LineSplitter = require('./LineSplitter');
const {
	parseCombatEntry,
} = require('./EntryCategorizer');
const {
	Damage,
	Health,
	Mana,
	Recovery,
	Buff,
	Movement,
	Skill,
	Misc,
} = require('../data/types');

class LogParser {
	#sourceStream;
	
	#data = [];
	
	#statistics = new Map();
	
	constructor (sourceStream) {
		this.#sourceStream = sourceStream;
	}
	
	async parseData () {
		const source = this.#sourceStream
			.pipeThrough(new TextDecoderStream())
			.pipeThrough(new LineSplitter());
		
		for await (const line of source) {
			const entry = parseCombatEntry(line);
			if (!entry) {
				continue;
			}
			
			this.#data.push(entry);
			const { name, type, action, amount } = entry;
			
			if (!this.#statistics.has(name)) {
				this.#statistics.set(name, LogParser.createMemo(name));
			}
			
			if (type === Misc) {
				// for now ignore misc
				continue;
			}
			
			const data = this.#statistics.get(name);
			const value = data[type][action] ?? 0;
			data[type][action] = value + amount;
		}
		
		return Array.from(this.#statistics.values());
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
			[Recovery]: this.getType(Recovery, count),
			[Buff]: this.getType(Buff, count),
			[Movement]: this.getType(Movement, count),
			[Skill]: this.getType(Skill, count),
			[Misc]: this.getType(Misc, count),
		};
	}
	
	static createMemo (name) {
		return {
			name,
			[Damage]: {},
			[Health]: {},
			[Mana]: {},
			[Recovery]: {},
			[Buff]: {},
			[Movement]: {},
			[Skill]: {},
		};
	}
	
	static sumAmount (entry, property) {
		return Object.values(entry[property] ?? {}).reduce((memo, value) => memo + value, 0);
	}
}

module.exports = LogParser;
