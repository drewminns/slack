import axios from 'axios';

import { FETCH_AUTH, FETCH_PROFILE, FETCH_FILES, DESTROY_FILE } from './types';

export function fetchAuth() {
	const request = axios.get('/auth')
	return {
		type: FETCH_AUTH,
		payload: request
	}
}

export function fetchProfile(token, user) {
	const request = axios.get(`https://slack.com/api/users.info?token=${token}&user=${user}`);
	return {
		type: FETCH_PROFILE,
		payload: request
	}
}

export function fetchFiles(token, types, userID, pageSize, page) {
	let data = {
		token: token,
		types: types,
		count: pageSize,
		page: page
	}
	if (userID !== 'all')
		data.user = userID
	const request = axios.get(`https://slack.com/api/files.list`, { params: data });
	return {
		type: FETCH_FILES,
		payload: request
	}
}

export function destroyFile(token, file) {
	const request = axios.get(`https://slack.com/api/files.delete?token=${token}&file=${file}`);
	return {
		type: DESTROY_FILE,
		payload: request
	}
}

