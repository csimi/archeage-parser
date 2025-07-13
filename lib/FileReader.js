const { createReadStream } = require('node:fs');
const { Readable } = require('node:stream');

class FileReader {
	#readable;
	
	constructor (filePath) {
		this.#readable = createReadStream(filePath);
	}
	
	getStream () {
		return Readable.toWeb(this.#readable);
	}
}

module.exports = FileReader;
