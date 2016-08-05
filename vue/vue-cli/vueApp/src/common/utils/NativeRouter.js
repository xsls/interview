export default function (name, data = {}) {
	window.router.go({
		name: name,
		params: data.params,
		query: data.query
	});
};