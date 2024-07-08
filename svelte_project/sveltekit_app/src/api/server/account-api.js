// @ts-nocheck
import API from './api';

class AccountAPI {
	lookup(query) {
		return API.get('account?' + query);
	}
	add(body) {
		return API.post('account/add', body);
	}
}

export default new AccountAPI();
