import {useSearchParams} from 'react-router-dom';
import {useCallback, useMemo} from 'react';
import type {EventFiltersType, EventFilterURLParams} from '../../../types';

const filterKeys = {
    search: 'search',
    app: 'app',
    dateFrom: 'dateFrom',
    dateTo: 'dateTo',
} as const satisfies Record<string, keyof EventFilterURLParams>;

export const useEventFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const filters = useMemo((): EventFiltersType => {
        const result: EventFiltersType = {};

        const searchText = searchParams.get(filterKeys.search);
        if (searchText) result.searchText = searchText;

        const app = searchParams.get(filterKeys.app);
        if (app) result.app = app;

        const dateFrom = searchParams.get(filterKeys.dateFrom);
        if (dateFrom) result.dateFrom = new Date(dateFrom);

        const dateTo = searchParams.get(filterKeys.dateTo);
        if (dateTo) result.dateTo = new Date(dateTo);

        return result;
    }, [searchParams]);

    const setFilters = (newFilters: EventFiltersType) => {
        const params = new URLSearchParams();

        if (newFilters.searchText) {
            params.set(filterKeys.search, newFilters.searchText);
        }

        if (newFilters.app) {
            params.set(filterKeys.app, newFilters.app);
        }

        if (newFilters.dateFrom) {
            params.set(filterKeys.dateFrom, newFilters.dateFrom.toISOString());
        }

        if (newFilters.dateTo) {
            params.set(filterKeys.dateTo, newFilters.dateTo.toISOString());
        }

        setSearchParams(params, {replace: true});
    };

    const clearFilters = useCallback(() => {
        setSearchParams({}, {replace: true});
    }, [setSearchParams]);

    const hasActiveFilters = useMemo(() => {
        return searchParams.toString().length > 0;
    }, [searchParams]);

    return {filters, setFilters, clearFilters, hasActiveFilters};
};
