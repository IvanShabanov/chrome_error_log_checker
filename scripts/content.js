class Class_check_error_log_ext {

	dbName = 'check_error_log_ext'
	dbMainStore = 'sites'

	constructor() {
		const THIS = this;
		fetch("/__error.log", {
			method: 'GET',
			cache: "no-cache"
		}).then(function(response) {
			if (response.ok) {
				let body = document.querySelector("body");
				let div = document.createElement("div");
				div.innerHTML = 'На сайте найден <a href="/__error.log" target="_blank">__error.log</a> <button onclick="">Следить за сайтом</button>';
				div.classList.add('__error_log');
				div.setAttribute('style', 'position:fixed; top: 0px; left: 0px; width: 100vw; text-align:center; color: #fff; padding: 10px; background: #a33; z-index: 1000000;');
				body.append(div);
				setTimeout(function() {
					THIS.remove_popup__error__log();
				}, 5000);
			}
		}).catch(function(err) {});
	}

	remove_popup__error__log() {
		let _el = document.querySelector('.__error_log');
		if (_el) {
			_el.remove();
		}
	}

	openDB() {
		const THIS = this;
		let openRequest = indexedDB.open(THIS.dbName, 1);

		openRequest.onupgradeneeded = () => {
			THIS.db = openRequest.result;
			if (!THIS.db.objectStoreNames.contains(THIS.dbMainStore)) { // если хранилище "books" не существует
				THIS.db.createObjectStore(THIS.dbMainStore, {
					keyPath: 'url'
				}); // создаём хранилище
			}
		};

		openRequest.onerror = () => {
			console.error("Error", openRequest.error);
		};

		openRequest.onsuccess = () => {
			THIS.db = openRequest.result;
		};
	}

	isdbOpened() {
		if (typeof this.db == 'undefined' || this.db === null || this.db == 0) {
			this.openDB();
		}
		if (typeof this.db == 'undefined' || this.db === null || this.db == 0) {
			return false;
		}
		return true;
	}

	putThisUrl() {
		let url = window.location.host;
		putUrl(url);
	}

	putUrl(url) {
		if (!this.isdbOpened()) {
			return;
		}

		if (typeof url == 'undefined') {
			return;
		}

		if (url == '') {
			return;
		}

		let transaction = db.transaction(THIS.dbMainStore, "readwrite");

		let sites = transaction.objectStore(THIS.dbMainStore);

		let site = {
			url: url,
			lastcheck: Date.now()
		};

		let request = sites.put(site);

		request.onsuccess = function() {

		};

		request.onerror = function() {
			console.log("Ошибка", request.error);
		};

	}

	delUrl(url) {
		if (!this.isdbOpened()) {
			return;
		}

		if (typeof url == 'undefined') {
			return;
		}

		if (url == '') {
			return;
		}

		let transaction = db.transaction(THIS.dbMainStore, "readwrite");

		let sites = transaction.objectStore(THIS.dbMainStore);

		let request = sites.delete(url);

		request.onsuccess = function() {

		};

		request.onerror = function() {
			console.log("Ошибка", request.error);
		};
	}

	getSites() {
		if (!this.isdbOpened()) {
			return;
		}

		let transaction = db.transaction(THIS.dbMainStore, "readwrite");
	}
}

let Check_error_log_ext = new Class_check_error_log_ext();