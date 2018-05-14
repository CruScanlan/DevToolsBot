import React from 'react';
import {Radio} from 'components';

import {Typeahead} from 'react-bootstrap-typeahead';
import options from './../exampleData';

class MenuAlignExample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            align: 'justify',
        };
    }

    render() {
        const {align} = this.state;
        const radios = [
            {label: 'Justify (default)', value: 'justify'},
            {label: 'Align left', value: 'left'},
            {label: 'Align right', value: 'right'},
        ];

        return (
            <div>
                <Typeahead
                    align={align}
                    labelKey="name"
                    options={options}
                    placeholder="Choose a state..."
                />
                {radios.map(({label, value}) => (
                    <Radio
                        checked={align === value}
                        key={value}
                        onChange={e => this.setState({align: value})}
                        value={value}
                    >
                        {label}
                    </Radio>
                ))}
            </div>
        );
    }
}

export default MenuAlignExample;
