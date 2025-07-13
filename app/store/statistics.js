import { create } from 'zustand';

const useStatistics = create((set) => ({
	'statistics': null,
	'isProcessing': false,
	'setStatistics': (statistics = {}) => set(() => ({
		statistics,
		'isProcessing': false,
	})),
	'clearStatistics': (isProcessing = false, statistics = null) => set({
		statistics,
		isProcessing,
	}),
}));

export default useStatistics;
