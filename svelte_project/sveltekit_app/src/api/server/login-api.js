// @ts-nocheck
import API from './api';

class LoginAPI {
	lookup(body) {
		return API.post('login', body);
	}
}

export default new LoginAPI();
