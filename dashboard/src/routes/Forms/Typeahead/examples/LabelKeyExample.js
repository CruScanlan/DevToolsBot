import React from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';

class LabelKeyExample extends React.Component {
    render() {
        return (
            <Typeahead
                labelKey={option => `${option.firstName} ${option.lastName}`}
                options={[
                    {firstName: 'Art', lastName: 'Blakey'},
                    {firstName: 'John', lastName: 'Coltrane'},
                    {firstName: 'Miles', lastName: 'Davis'},
                    {firstName: 'Herbie', lastName: 'Hancock'},
                    {firstName: 'Charlie', lastName: 'Parker'},
                    {firstName: 'Tony', lastName: 'Williams'},
                ]}
                placeholder="Who's the coolest cat?"
            />
        );
    }
}

export default LabelKeyExample;
