import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BarGraph from './BarGraph';
import useOptions from '../store/options';
import useStatistics from '../store/statistics';
import { types, getTypeName } from '../../lib/utils/types';

const {
	Overview,
	Damage,
	Health,
	Taken,
	Received,
	Recovery,
} = types;

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
	
	if (displayType === Overview) {
		return (
			<Container fluid className="d-flex flex-column flex-grow-1">
				<Row className="flex-row flex-grow-1">
					<Col className="d-flex flex-column flex-grow-1"><BarGraph data={data[Damage].slice(0, 20)} type={Damage} title={getTypeName(Damage)} /></Col>
					<Col className="d-flex flex-column flex-grow-1"><BarGraph data={data[Health].slice(0, 20)} type={Health} title={getTypeName(Health)} /></Col>
					<Col className="d-flex flex-column flex-grow-1"><BarGraph data={data[Taken].slice(0, 20)} type={Taken} title={getTypeName(Taken)} /></Col>
				</Row>
				<Row className="flex-row flex-grow-1">
					<Col className="d-flex flex-column flex-grow-1"><BarGraph data={data[Received].slice(0, 20)} type={Received} title={getTypeName(Received)} /></Col>
					<Col className="d-flex flex-column flex-grow-1"><BarGraph data={data[Recovery].slice(0, 20)} type={Recovery} title={getTypeName(Recovery)} /></Col>
					<Col className="d-flex flex-column flex-grow-1">&nbsp;</Col>
				</Row>
			</Container>
		);
	}
	
	return (
		<BarGraph data={data[displayType].slice(0, 50)} type={displayType} title={getTypeName(displayType)} />
	);
}
