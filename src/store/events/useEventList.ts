import {useState, useEffect, useCallback, useRef} from 'react';
import {getEventList} from '../../services';
import type {SysLogEvent, EventFiltersType} from '../../types';

type UseEventListState = {
    events: SysLogEvent[];
    isInitialLoading: boolean;
    isFetchingMore: boolean;
    error: string | null;
    hasMore: boolean;
    total: number;
};

type UseEventListReturn = UseEventListState & {
    loadMore: () => void;
    refresh: () => void;
};

const DEFAULT_PAGE_SIZE = 50;
const DEFAULT_ITEM_HEIGHT = 120;
const OVERSCAN_ITEMS = 5;

interface UseEventListOptions {
    filters?: EventFiltersType;
    containerHeight?: number;
    estimatedItemHeight?: number;
}

export const useEventList = (options: UseEventListOptions): UseEventListReturn => {
    const {filters, containerHeight} = options
    const [state, setState] = useState<UseEventListState>({
        events: [],
        isInitialLoading: false,
        isFetchingMore: false,
        error: null,
        hasMore: true,
        total: 0,
    });

    const pageNumRef = useRef(1);

    const getPageSize = useCallback(
        (isInitial: boolean): number => {
            if (isInitial && containerHeight) {
                const visibleItems = Math.ceil(containerHeight / DEFAULT_ITEM_HEIGHT);
                return Math.max(visibleItems + OVERSCAN_ITEMS, 10);
            }
            return DEFAULT_PAGE_SIZE;
        },
        [containerHeight]
    );

    const fetchEvents = useCallback(
        async (page: number, append: boolean = false) => {

            pageNumRef.current = page;

            setState(prev => ({
                ...prev,
                isInitialLoading: !append,
                isFetchingMore: append,
                error: null,
            }));

            try {
                const response = await getEventList({
                    pageSize: getPageSize(!append),
                    pageNum: page,
                    filters,
                });


                setState(prev => ({
                    ...prev,
                    events: append ? [...prev.events, ...response.events] : response.events,
                    hasMore: response.hasMore,
                    total: response.total,
                    isInitialLoading: false,
                    isFetchingMore: false,
                }));
            } catch (err) {
                if (err instanceof Error && err.name === 'AbortError') {
                    return;
                }

                setState(prev => ({
                    ...prev,
                    error: err instanceof Error ? err.message : 'Ошибка загрузки данных',
                    isInitialLoading: false,
                    isFetchingMore: false,
                }));
            }
        },
        [filters, getPageSize]
    );

    const loadMore = useCallback(() => {
        if (!state.hasMore || state.isFetchingMore) return;
        fetchEvents(pageNumRef.current + 1, true);
    }, [state.hasMore, state.isFetchingMore, fetchEvents]);

    const refresh = useCallback(() => {
        fetchEvents(1, false);
    }, [fetchEvents]);

    useEffect(() => {
        fetchEvents(1, false);
    }, [fetchEvents]);

    return {
        ...state,
        loadMore,
        refresh,
    };
};
