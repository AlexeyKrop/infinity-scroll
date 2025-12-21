export type SysLogEventType = 'error' | 'warning' | 'info';

export type SysLogEvent = {
    uniqueId: string;
    type: SysLogEventType;
    date: Date;
    app: string;
    message: string;
}

export type EventFiltersType = {
    searchText?: string;
    app?: string;
    dateFrom?: Date;
    dateTo?: Date;
}

export type GetEventListParams = {
    pageSize: number;
    pageNum: number;
    filters?: EventFiltersType;
}

export type GetEventListResponse = {
    events: SysLogEvent[];
    hasMore: boolean;
    total: number;
}
