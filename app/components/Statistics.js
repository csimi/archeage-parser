import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import BarGraph from './BarGraph';
import useOptions from '../store/options';
import useStatistics from '../store/statistics';

export default function Statistics () {
	const displayType = useOptions((state) => state.displayType);
	const data = useStatistics((state) => state.statistics);
	const isProcessing = useStatistics((state) => state.isProcessing);
	
	if (isProcessing) {
		return (
			<div className="pt-5 pb-5 text-center">
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Processing...</span>
				</Spinner>
			</div>
		);
	}
	
	return (
		<BarGraph width="800" height="600" data={data[displayType].slice(0, 20)} type={displayType} />
	);
}
