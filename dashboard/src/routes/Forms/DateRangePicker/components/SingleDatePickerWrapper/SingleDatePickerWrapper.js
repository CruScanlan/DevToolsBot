import React, { PropTypes } from 'react';
import momentPropTypes from 'react-moment-proptypes';
import _ from 'underscore';
import moment from 'moment';

import {
    SingleDatePicker,
    SingleDatePickerShape,

    isInclusivelyAfterDay
} from 'react-dates';
import { HORIZONTAL_ORIENTATION, ANCHOR_LEFT } from '../../constants';

const propTypes = {
    // example props for the demo
    autoFocus: PropTypes.bool,
    initialDate: momentPropTypes.momentObj,
    ...(_.omit(SingleDatePickerShape, [
        'date',
        'onDateChange',
        'focused',
        'onFocusChange',
    ])),
};

const defaultProps = {
    // example props for the demo
    autoFocus: false,
    initialDate: null,

    // input related props
    id: 'date',
    placeholder: 'Date',
    disabled: false,
    required: false,
    screenReaderInputMessage: '',
    showClearDate: false,

    // calendar presentation and interaction related props
    orientation: HORIZONTAL_ORIENTATION,
    anchorDirection: ANCHOR_LEFT,
    horizontalMargin: 0,
    withPortal: false,
    withFullScreenPortal: false,
    initialVisibleMonth: () => moment(),
    numberOfMonths: 2,
    keepOpenOnDateSelect: false,
    reopenPickerOnClearDate: false,

    // navigation related props
    navPrev: null,
    navNext: null,
    onPrevMonthClick() {},
    onNextMonthClick() {},

    // day presentation and interaction related props
    renderDay: null,
    enableOutsideDays: false,
    isDayBlocked: () => false,
    isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
    isDayHighlighted: () => {},

    // internationalization props
    displayFormat: () => moment.localeData().longDateFormat('L'),
    monthFormat: 'MMMM YYYY',
    phrases: {
        closeDatePicker: 'Close',
        clearDate: 'Clear Date',
    },
};

class SingleDatePickerWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: props.autoFocus,
            date: props.initialDate,
        };

        this.onDateChange = this.onDateChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
    }

    onDateChange(date) {
        this.setState({ date });
    }

    onFocusChange({ focused }) {
        this.setState({ focused });
    }

    render() {
        const { focused, date } = this.state;

        return (
            <SingleDatePicker
                {...this.props}
                id="date_input"
                date={date}
                focused={focused}
                onDateChange={this.onDateChange}
                onFocusChange={this.onFocusChange}
            />
        );
    }
}

SingleDatePickerWrapper.propTypes = propTypes;
SingleDatePickerWrapper.defaultProps = defaultProps;

export default SingleDatePickerWrapper;
