import type {ReactNode} from "react";
import {Calendar, X} from 'lucide-react';
import DatePicker, {CalendarContainer} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


import styles from './DateRangePicker.module.scss';

type DateRangePickerProps = {
    startDate: Date | null;
    endDate: Date | null;
    onChange: (dates: [Date | null, Date | null]) => void;
    onClear: () => void;
    placeholder?: string;
};

type CustomCalendarContainerProps = {
    className: string;
    children: ReactNode;
}

const CustomCalendarContainer = (props: CustomCalendarContainerProps) => {
    const {className, children} = props;
    return (
        <div className={styles.calendar_container}>
            <CalendarContainer className={className}>
                <div className={styles.calendar_wrapper}>{children}</div>
            </CalendarContainer>
        </div>
    );
};

export const DateRangePicker = (props: DateRangePickerProps) => {
    const {
        startDate,
        endDate,
        onChange,
        onClear,
        placeholder = 'Выбрать период'
    } = props
    return (
        <div className={styles.date_picker_wrapper}>
            <Calendar className={styles.calendar_icon} size={16}/>
            <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                dateFormat="dd.MM.yyyy"
                placeholderText={placeholder}
                className={styles.date_input}
                calendarContainer={CustomCalendarContainer}
                wrapperClassName={styles.date_picker_wrapper_inner}
            />
            {startDate && (
                <button
                    onClick={onClear}
                    className={styles.clear_button}
                    type="button"
                >
                    <X size={14}/>
                </button>
            )}
        </div>
    );
};
