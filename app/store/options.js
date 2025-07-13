import { create } from 'zustand';
import {
	Damage,
} from '../../data/types';

const useOptions = create((set) => ({
	'displayType': Damage,
	'setDisplayType': (displayType) => set(() => ({
		displayType,
	})),
}));

export default useOptions;
