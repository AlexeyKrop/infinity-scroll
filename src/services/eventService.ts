import type {GetEventListParams, GetEventListResponse, SysLogEvent} from '../types';
import {stubData} from '../utils';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const filterEvents = (events: SysLogEvent[], filters?: GetEventListParams['filters']): SysLogEvent[] => {
    if (!filters) return events;

    return events.filter(event => {
        if (filters.searchText) {
            const searchLower = filters.searchText.toLowerCase();
            if (!event.message.toLowerCase().includes(searchLower)) {
                return false;
            }
        }

        if (filters.app && event.app !== filters.app) {
            return false;
        }

        if (filters.dateFrom && event.date < filters.dateFrom) {
            return false;
        }

        if (filters.dateTo && event.date > filters.dateTo) {
            return false;
        }

        return true;
    });
};

export const getEventList = async (params: GetEventListParams): Promise<GetEventListResponse> => {
    const {pageSize, pageNum, filters} = params;

    await delay(500);

    const filteredEvents = filterEvents(stubData, filters);

    const startIndex = pageNum * pageSize;
    const endIndex = startIndex + pageSize;
    const events = filteredEvents.slice(startIndex, endIndex);

    return {
        events,
        hasMore: endIndex < filteredEvents.length,
        total: filteredEvents.length,
    };
};

export const getUniqueApps = (): string[] => {
    const apps = new Set(stubData.map(event => event.app));
    return Array.from(apps).sort();
};
