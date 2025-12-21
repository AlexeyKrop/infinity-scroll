import {memo} from 'react';
import {Virtuoso} from 'react-virtuoso';
import type {SysLogEvent} from '../../../types';
import {Skeleton} from "../../../components";

import {EventItem} from './EventItem/EventItem.tsx';


type EventListProps = {
    events: SysLogEvent[];
    hasMore: boolean;
    isFetchingMore: boolean;
    onLoadMore: () => void;
};

export const EventList = memo((props: EventListProps) => {
    const {events, hasMore, isFetchingMore, onLoadMore} = props;

    return (
        <Virtuoso
            data={events}
            useWindowScroll
            endReached={() => {
                if (hasMore && !isFetchingMore) {
                    onLoadMore();
                }
            }}
            itemContent={(_, event) => (
                <EventItem event={event} key={event.uniqueId}/>
            )}
            increaseViewportBy={{top: 600, bottom: 600}}
            components={{
                Footer: () =>
                    isFetchingMore ? (
                        <Skeleton count={3} />
                    ) : null
            }}
        />
    );
});
