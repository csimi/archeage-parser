import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from './Navbar';
import FileDropper from './FileDropper';
import Statistics from './Statistics';
import useStatistics from '../store/statistics';

export default function Layout () {
	const statistics = useStatistics((state) => state.statistics);
	
	return (
		<>
			<Navbar />
			<Container fluid className="d-flex flex-column flex-grow-1">
				{statistics ? <Statistics data={statistics} /> : <FileDropper />}
			</Container>
		</>
	);
}
