const { join } = require('node:path');
const FileReader = require('./lib/FileReader');
const LogParser = require('./lib/LogParser');

const onRuntimeError = (err) => {
	console.debug('Runtime error');
	console.trace(err);
	process.exit(1);
};

process.on('uncaughtException', onRuntimeError);
process.on('unhandledRejection', onRuntimeError);

const reader = new FileReader(join(__dirname, 'Combat.log'));
const parser = new LogParser(reader.getStream());

Promise.resolve().then(async () => {
	await parser.parseData();
	const data = parser.getData();
	console.log(JSON.stringify(data));
}).catch((err) => {
	console.debug('Processing error');
	console.trace(err);
	process.exit(1);
});
