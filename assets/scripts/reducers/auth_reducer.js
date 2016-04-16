import { FETCH_AUTH } from '../actions/types';

export default function(state = [], action) {
	switch(action.type) {
		case FETCH_AUTH:
			return { ...state, profile: action.payload.data }
		default:
			return state;
	}
}

