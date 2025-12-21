import {v4 as uuidv4} from 'uuid';
import {subDays} from 'date-fns';
import type {SysLogEvent, SysLogEventType} from '../types';

const eventTypes: SysLogEventType[] = ['error', 'warning', 'info'];

const apps = [
    'app-auth',
    'app-payment',
    'app-notifications',
    'app-core',
    'app-api',
    'app-database',
];

const messages = {
    error: [
        'Failed to connect to database',
        'User authentication failed',
        'API request timeout',
        'Memory limit exceeded',
        'File not found',
        'Permission denied',
    ],
    warning: [
        'High memory usage detected',
        'Deprecated API endpoint used',
        'Slow query execution',
        'Cache miss rate above threshold',
        'Connection pool nearly exhausted',
    ],
    info: [
        'User logged in successfully',
        'New order created',
        'Cache cleared',
        'Database backup completed',
        'Configuration updated',
        'Email sent successfully',
    ],
};

const randomItem = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

const randomDate = (start: Date, end: Date): Date => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const generateEvent = (): SysLogEvent => {
    const type = randomItem(eventTypes);
    const now = new Date();
    const monthAgo = subDays(now, 30);

    return {
        uniqueId: uuidv4(),
        type,
        date: randomDate(monthAgo, now),
        app: randomItem(apps),
        message: randomItem(messages[type]),
    };
};

export const generateEvents = (count: number): SysLogEvent[] => {
    return Array.from({length: count}, () => generateEvent()).sort((a, b) => b.date.getTime() - a.date.getTime());
};

export const stubData = generateEvents(5000);
