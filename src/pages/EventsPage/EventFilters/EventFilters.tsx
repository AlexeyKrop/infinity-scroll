import {useState, useEffect} from 'react';
import {X} from 'lucide-react';
import {getUniqueApps} from '../../../services';
import {useDebounce} from '../../../hooks';
import type {EventFiltersType} from '../../../types';
import {DateRangePicker, Select, Input} from '../../../components';

import styles from './EventFilters.module.scss';

type EventFiltersProps = {
    filters: EventFiltersType;
    onChange: (filters: EventFiltersType) => void;
    onClear: () => void;
    hasActiveFilters: boolean;
};

type AppOption = {
    value: string;
    label: string;
};

export const EventFilters = (props: EventFiltersProps) => {
    const {filters, onChange, hasActiveFilters, onClear} = props;
    const [searchText, setSearchText] = useState<string>(filters.searchText || '');

    const debouncedSearchText = useDebounce(searchText, 500);

    const appOptions: AppOption[] = [
        {value: 'all', label: 'Все приложения'},
        ...getUniqueApps().map(app => ({value: app, label: app}))
    ];

    useEffect(() => {
        onChange({...filters, searchText: debouncedSearchText});
    }, [debouncedSearchText]);

    const handleAppChange = (value: string) => {
        onChange({...filters, app: value === 'all' ? undefined : value});
    };

    const handleDateChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        onChange({
            ...filters,
            dateFrom: start || undefined,
            dateTo: end || undefined,
        });
    };

    const clearDateRange = () => {
        onChange({...filters, dateFrom: undefined, dateTo: undefined});
    };

    const handleClearAll = () => {
        setSearchText('');
        onClear();
    };


    return (
        <div className={styles.filters}>
            <div className={styles.filters_item}>
                <Input
                    value={searchText}
                    onChange={setSearchText}
                    placeholder="Поиск по сообщению..."
                    type="search"
                />
            </div>

            <div className={styles.filters_item}>
                <Select
                    value={filters.app || 'all'}
                    options={appOptions}
                    onChange={handleAppChange}
                />
            </div>

            <div className={styles.filters_item}>
                <DateRangePicker
                    startDate={filters.dateFrom || null}
                    endDate={filters.dateTo || null}
                    onChange={handleDateChange}
                    onClear={clearDateRange}
                    placeholder="Выбрать период"
                />
            </div>
            {hasActiveFilters && (
                <button
                    onClick={handleClearAll}
                    className={styles.clear_button}
                    type="button"
                >
                    <X size={16}/>
                    Сбросить фильтры
                </button>
            )}
        </div>
    );
};
