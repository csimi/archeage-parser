import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
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
	const focusName = useOptions((state) => state.focusName);
	const setFocusName = useOptions((state) => state.setFocusName);
	
	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container fluid>
				<Navbar.Brand style={{
					'fontVariant': 'small-caps',
				}}>Archeage Combat Log Parser</Navbar.Brand>
				<div className="d-flex flex-row">
					<Form.Group className="me-2">
						<Form.Control type="text" placeholder="Focus Name" value={focusName} onInput={setFocusName} />
					</Form.Group>
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
				</div>
			</Container>
		</Navbar>
	);
}
