export type SysLogEventType = 'error' | 'warning' | 'info';

export type SysLogEvent = {
    uniqueId: string;
    type: SysLogEventType;
    date: Date;
    app: string;
    message: string;
}

export type EventFilters = {
    searchText?: string;
    app?: string;
    dateFrom?: Date;
    dateTo?: Date;
}

export type GetEventListParams = {
    pageSize: number;
    pageNum: number;
    filters?: EventFilters;
}

export type GetEventListResponse = {
    events: SysLogEvent[];
    hasMore: boolean;
    total: number;
}
