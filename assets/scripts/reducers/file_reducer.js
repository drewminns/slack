import { FETCH_FILES, DESTROY_FILE } from '../actions/types';

export default function(state = [], action) {
	switch(action.type) {
		case FETCH_FILES:
			return { ...state, fileList: action.payload.data.files }
		case DESTROY_FILE:
			let files = {...state}
			let fileArray = files.fileList.filter(val => val.id !== action.file );
			return { ...state, fileList: fileArray }
		default:
			return state;
	}
}