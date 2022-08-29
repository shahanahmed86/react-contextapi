class Storage {
	tokenKey = '@token';
	storageKey = '@storage';

	setData = (key, payload, toJson = false) => {
		try {
			let data = payload;
			if (payload && toJson) data = JSON.stringify(payload);

			return localStorage.setItem(key, data);
		} catch (error) {
			console.log('setData catch...', error);
		}
	};

	getData = (key, toParse = false) => {
		try {
			let payload = localStorage.getItem(key);
			if (payload && toParse) payload = JSON.parse(payload);

			return payload;
		} catch (error) {
			console.log('getData catch...', error);
		}
	};

	removeData = (key) => {
		try {
			return localStorage.removeItem(key);
		} catch (error) {
			console.log('removeData catch...', error);
		}
	};
}

const storage = new Storage();

export default storage;
