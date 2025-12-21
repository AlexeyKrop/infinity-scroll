import {memo} from 'react';
import clsx from 'clsx';
import {XCircle, AlertTriangle, Info} from 'lucide-react';

import type {SysLogEvent} from '../../../../types';
import {formatDate} from '../../../../utils';

import styles from './EventItem.module.scss';

type EventItemProps = {
    event: SysLogEvent;
};

const eventIcons = {
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
};

export const EventItem = memo((props: EventItemProps) => {
    const {event} = props
    const formatted = formatDate(event.date);
    const Icon = eventIcons[event.type];

    return (
        <div className={clsx(styles.eventItem, styles[event.type])}>
            <div className={styles.iconWrapper}>
                <Icon className={styles.icon} size={20} />
            </div>

            <div className={styles.content}>
                <div className={styles.header}>
                    <span className={clsx(styles.badge, styles[event.type])}>
                        {event.type}
                    </span>
                    <span className={styles.date}>
                        {formatted.date} • {formatted.time}
                    </span>
                </div>

                <p className={styles.message}>{event.message}</p>

                <span className={styles.app}>
                    Application: <strong>{event.app}</strong>
                </span>
            </div>
        </div>
    );
});
