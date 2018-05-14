import React, { PropTypes } from 'react';
import momentPropTypes from 'react-moment-proptypes';
import _ from 'underscore';
import moment from 'moment';

import {
    DayPickerRangeController,
    ScrollableOrientationShape,

    isInclusivelyAfterDay
} from 'react-dates';
import { START_DATE, END_DATE, HORIZONTAL_ORIENTATION } from './../../constants';

const propTypes = {
    // example props for the demo
    autoFocusEndDate: PropTypes.bool,
    initialStartDate: momentPropTypes.momentObj,
    initialEndDate: momentPropTypes.momentObj,

    keepOpenOnDateSelect: PropTypes.bool,
    minimumNights: PropTypes.number,
    isOutsideRange: PropTypes.func,
    isDayBlocked: PropTypes.func,
    isDayHighlighted: PropTypes.func,

    // DayPicker props
    enableOutsideDays: PropTypes.bool,
    numberOfMonths: PropTypes.number,
    orientation: ScrollableOrientationShape,
    withPortal: PropTypes.bool,
    initialVisibleMonth: PropTypes.func,

    navPrev: PropTypes.node,
    navNext: PropTypes.node,

    onPrevMonthClick: PropTypes.func,
    onNextMonthClick: PropTypes.func,
    onOutsideClick: PropTypes.func,
    renderDay: PropTypes.func,

    // i18n
    monthFormat: PropTypes.string,
};

const defaultProps = {
    // example props for the demo
    autoFocusEndDate: false,
    initialStartDate: null,
    initialEndDate: null,

    // day presentation and interaction related props
    renderDay: null,
    minimumNights: 1,
    isDayBlocked: () => false,
    isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
    isDayHighlighted: () => false,
    enableOutsideDays: false,

    // calendar presentation and interaction related props
    orientation: HORIZONTAL_ORIENTATION,
    withPortal: false,
    initialVisibleMonth: () => moment(),
    numberOfMonths: 2,
    onOutsideClick() {},
    keepOpenOnDateSelect: false,

    // navigation related props
    navPrev: null,
    navNext: null,
    onPrevMonthClick() {},
    onNextMonthClick() {},

    // internationalization
    monthFormat: 'MMMM YYYY',
};

class DayPickerRangeControllerWrap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focusedInput: props.autoFocusEndDate ? END_DATE : START_DATE,
            startDate: props.initialStartDate,
            endDate: props.initialEndDate,
        };

        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
    }

    onDatesChange({ startDate, endDate }) {
        this.setState({ startDate, endDate });
    }

    onFocusChange(focusedInput) {
        this.setState({
            // Force the focusedInput to always be truthy so that dates are always selectable
            focusedInput: !focusedInput ? START_DATE : focusedInput,
        });
    }

    render() {
        const { showInputs } = this.props;
        const { focusedInput, startDate, endDate } = this.state;

        const props = _.omit(this.props, [
            'autoFocus',
            'autoFocusEndDate',
            'initialStartDate',
            'initialEndDate',
        ]);

        const startDateString = startDate && startDate.format('YYYY-MM-DD');
        const endDateString = endDate && endDate.format('YYYY-MM-DD');

        return (
            <div>
                {showInputs &&
                    <div style={{ marginBottom: 16 }}>
                        <input type="text" name="start date" value={startDateString} readOnly />
                        <input type="text" name="end date" value={endDateString} readOnly />
                    </div>
                }

                <DayPickerRangeController
                    {...props}
                    onDatesChange={this.onDatesChange}
                    onFocusChange={this.onFocusChange}
                    focusedInput={focusedInput}
                    startDate={startDate}
                    endDate={endDate}
                />
            </div>
        );
    }
}

DayPickerRangeControllerWrap.propTypes = propTypes;
DayPickerRangeControllerWrap.defaultProps = defaultProps;

export default DayPickerRangeControllerWrap;
