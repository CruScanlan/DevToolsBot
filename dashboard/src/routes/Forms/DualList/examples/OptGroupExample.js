import React from 'react';
import DualListBox from 'react-dual-listbox';

const options = [
	{
		label: 'Earth',
		options: [
			{ value: 'luna', label: 'Moon' },
		],
	},
	{
		label: 'Mars',
		options: [
			{ value: 'phobos', label: 'Phobos' },
			{ value: 'deimos', label: 'Deimos' },
		],
	},
	{
		label: 'Jupiter',
		options: [
			{ value: 'io', label: 'Io' },
			{ value: 'europa', label: 'Europa' },
			{ value: 'ganymede', label: 'Ganymede' },
			{ value: 'callisto', label: 'Callisto' },
		],
	},
];

class OptGroupExample extends React.Component {
	constructor() {
		super();

		this.state = { selected: ['luna', 'io'] };

		this.onChange = this.onChange.bind(this);
	}

	onChange(selected) {
		this.setState({ selected });
	}

	render() {
		return (
			<DualListBox
				name="moons"
				options={options}
				selected={this.state.selected}
				onChange={this.onChange}
			/>
		);
	}
}
export default OptGroupExample;
