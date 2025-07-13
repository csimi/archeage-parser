import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import useOptions from '../store/options';
import { types, getTypeName } from '../../lib/utils/types';

const {
	Overview,
	Damage,
	Health,
	Taken,
	Received,
	Recovery,
} = types;

const typesList = [
	Overview,
	Damage,
	Health,
	Taken,
	Received,
	Recovery,
];

export default function NavComponent () {
	const displayType = useOptions((state) => state.displayType);
	const setDisplayType = useOptions((state) => state.setDisplayType);
	
	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container fluid>
				<Navbar.Brand style={{
					'fontVariant': 'small-caps',
				}}>Archeage Combat Log Parser</Navbar.Brand>
				<Dropdown align="end">
					<Dropdown.Toggle variant="primary" id="dropdown-basic">
						Display
					</Dropdown.Toggle>
					<Dropdown.Menu>
						{typesList.map((type) => (
							<Dropdown.Item key={type} active={displayType === type} onClick={() => setDisplayType(type)}>{getTypeName(type)}</Dropdown.Item>
						))}
					</Dropdown.Menu>
				</Dropdown>
			</Container>
		</Navbar>
	);
}
