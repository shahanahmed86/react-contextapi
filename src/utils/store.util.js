class Storage {
	tokenKey = '@token';
	storageKey = '@storage';

	get isTokenExists() {
		return !!this.getData(this.tokenKey);
	}

	setData = (key, payload, toJson = true) => {
		try {
			let data = payload;
			if (payload && toJson) data = JSON.stringify(payload);

			return localStorage.setItem(key, data);
		} catch (error) {
			console.log('setData catch...', error);
			return null;
		}
	};

	getData = (key, toParse = true) => {
		try {
			let payload = localStorage.getItem(key);
			if (payload && toParse) payload = JSON.parse(payload);

			return payload;
		} catch (error) {
			console.log('getData catch...', error);
			return null;
		}
	};

	removeData = (key) => {
		try {
			return localStorage.removeItem(key);
		} catch (error) {
			console.log('removeData catch...', error);
			return null;
		}
	};
}

const storage = new Storage();

export default storage;
