import { create } from 'zustand';
import { types } from '../../lib/utils/types';

const {
	Overview,
} = types;

const useOptions = create((set) => ({
	'displayType': Overview,
	'setDisplayType': (displayType) => set(() => ({
		displayType,
	})),
	'focusName': '',
	'setFocusName': ({ target }) => set(() => ({
		'focusName': target.value,
	})),
}));

export default useOptions;
