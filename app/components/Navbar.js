import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import useOptions from '../store/options';
import {
	Damage,
	Health,
	Mana,
	Recovery,
	Buff,
	Movement,
	Skill,
	Misc,
} from '../../data/types';

const types = [
	Damage,
	Health,
	Mana,
	Recovery,
	Buff,
	Movement,
	Skill,
	Misc,
];

export default function NavComponent () {
	const displayType = useOptions((state) => state.displayType);
	const setDisplayType = useOptions((state) => state.setDisplayType);
	
	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container fluid>
				<Navbar.Brand href="#home" style={{
					'fontVariant': 'small-caps',
				}}>Archeage Combat Log Parser</Navbar.Brand>
				<Dropdown align="end">
					<Dropdown.Toggle variant="primary" id="dropdown-basic">
						Display
					</Dropdown.Toggle>
					<Dropdown.Menu>
						{types.map((type) => (
							<Dropdown.Item key={type} active={displayType === type} onClick={() => setDisplayType(type)}>{type}</Dropdown.Item>
						))}
					</Dropdown.Menu>
				</Dropdown>
			</Container>
		</Navbar>
	);
}
