import { create } from 'zustand';
import {
	//Damage,
	Health,
} from '../../data/types';

const useOptions = create((set) => ({
	'displayType': Health,
	'setDisplayType': (displayType) => set(() => ({
		displayType,
	})),
}));

export default useOptions;
