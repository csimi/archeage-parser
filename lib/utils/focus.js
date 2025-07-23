const getFocus = (data, type) => Object.entries(data).map(([key, value]) => {
	return {
		'name': key,
		[type]: value,
	};
}).sort((a, b) => {
	return b[type] - a[type];
});

module.exports = {
	getFocus,
};
