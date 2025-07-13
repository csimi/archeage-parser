const separator = '\n';
const separatorLength = separator.length;

const split = {
	async transform (chunk, controller) {
		chunk = await chunk;
		let buffers = this.buffers.slice();
		let memo = 0;
		for (;;) {
			const index = chunk.indexOf(separator, memo);
			if (index === -1) {
				this.buffers.push(index > 0 ? chunk.slice(index) : chunk);
				return;
			}
			
			const prev = buffers.length ? buffers.join('') : '';
			if (prev) {
				buffers = [];
				this.buffers = buffers;
			}
			
			controller.enqueue(prev + chunk.slice(memo, index));
			memo = index + separatorLength;
		}
	},
};

class LineSplitter extends TransformStream {
	constructor () {
		super({
			...split,
			'buffers': [],
		});
	}
}

module.exports = LineSplitter;
