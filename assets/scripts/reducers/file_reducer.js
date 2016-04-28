import { FETCH_FILES, DESTROY_FILE } from '../actions/types';

export default function(state = [], action) {
	switch(action.type) {
		case FETCH_FILES:
			return { ...state, fileList: action.payload.data.files }
		case DESTROY_FILE:
			if (action.payload.data.ok) {
				let files = {...state}
				let fileID = action.payload.config.url.split("&file=").pop();
				let fileArray = files.fileList.filter(val => val.id !== fileID );
				return { ...state, fileList: fileArray }
			} else {
				return {...state}
			}
		default:
			return state;
	}
}