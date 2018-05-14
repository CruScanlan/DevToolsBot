import fetch from 'isomorphic-fetch';
import React from 'react';
import { Checkbox } from 'components';

import { AsyncTypeahead } from 'react-bootstrap-typeahead';

class AsyncExample extends React.Component {

    constructor(props) {
    super(props);

    this.state = {
        allowNew: false,
        multiple: false,
        options: [],
    };
    }

    render() {
        return (
            <div>
                <AsyncTypeahead
                    {...this.state}
                    labelKey="login"
                    onSearch={this._handleSearch}
                    placeholder="Search for a Github user..."
                    renderMenuItemChildren={this._renderMenuItemChildren}
                />
                {this._renderCheckboxes()}
            </div>
        );
    }

    _renderCheckboxes() {
        const checkboxes = [
            {label: 'Multi-Select', name: 'multiple'},
            {label: 'Allow custom selections', name: 'allowNew'},
        ];

        return checkboxes.map(({label, name}) => (
            <Checkbox
                checked={this.state[name]}
                key={name}
                name={name}
                onChange={this._handleChange}
            >
                {label}
            </Checkbox>
        ));
    }

    _renderMenuItemChildren(option, props, index) {
        return (
            <div key={option.id}>
                <img
                    src={option.avatar_url}
                    style={{
                        height: '24px',
                        marginRight: '10px',
                        width: '24px',
                    }}
                />
                <span>{option.login}</span>
            </div>
        );
    }

    _handleChange = e => {
        const {checked, name} = e.target;
        this.setState({[name]: checked});
    }

    _handleSearch = query => {
        if (!query) {
          return;
        }

        fetch(`https://api.github.com/search/users?q=${query}`)
          .then(resp => resp.json())
          .then(json => this.setState({options: json.items}));
    }
}

export default AsyncExample;
