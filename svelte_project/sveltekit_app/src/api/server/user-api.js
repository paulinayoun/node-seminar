// @ts-nocheck
import API from './api';

class UserAPI {
	lookup(query) {
		return API.get('users?' + query);
	}
	add(body) {
		return API.post('users/inAndUp', body);
	}

	update(body) {
		return API.put('users/inAndUp', body);
	}

	delete(query) {
		return API.delete('users/delete?' + query);
	}
}

export default new UserAPI();
