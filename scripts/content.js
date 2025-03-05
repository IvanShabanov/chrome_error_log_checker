function remove_popup__error__log() {
	let _el = document.querySelector('.__error_log');
	if (_el) {
		_el.remove();
	}
}
if (document.querySelector('head')?.innerHTML?.includes('bitrix')) {
	fetch("/__error.log", {
		method: 'GET',
		cache: "no-cache"
	}).then(function (response) {
		if (response.ok) {
			let body = document.querySelector("body");
			let div = document.createElement("div");
			div.innerHTML = 'На сайте найден <a href="/__error.log" target="_blank">__error.log</a>';
			div.classList.add('__error_log');
			div.setAttribute('style', 'position:fixed; top: 0px; left: 0px; width: 100vw; text-align:center; color: #fff; padding: 10px; background: #a33; z-index: 1000000;');
			body.append(div);
			setTimeout(function () {
				remove_popup__error__log()
			}, 3000);
		}
	}).catch(function (err) {

	});
}