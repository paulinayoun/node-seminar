// @ts-nocheck
import axios from 'axios';
import { get } from 'svelte/store';

let access_token = false;

const API = axios.create({
	baseURL: 'http://localhost:8888', //import.meta.env.VITE_PUBLIC_BASE_PATH,
	headers: {
		'Content-Type': 'application/json'
	}
});

API.interceptors.request.use(
	function (config) {
		// loading.set(true)
		config.headers = authHeader();
		return config;
	},
	function (error) {
		// loading.set(false)
		return Promise.reject(error);
	}
);

API.interceptors.response.use(
	function (response) {
		// loading.set(false)
		return response;
	},

	function (error) {
		// loading.set(false)
		return Promise.reject(error);
	}
);

function authHeader() {
	if (access_token) {
		return {
			'Content-Type': 'application/json',
			Authorization: get(access_token)
		};
	} else {
		return {
			'Content-Type': 'application/json'
		};
	}
}

export default API;
