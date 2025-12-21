import {useEffect, useRef, useState} from 'react';
import {useEventList} from '../../store';
import {Skeleton} from "../../components";
import {EventFilters} from './EventFilters/EventFilters.tsx';
import {EventList} from "./EventList/EventList.tsx";


import styles from './EventsPage.module.scss';


export const EventsPage = () => {
    const [filters, setFilters] = useState({});
    const [containerHeight, setContainerHeight] = useState<number>();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            setContainerHeight(containerRef.current.clientHeight);
        }
    }, []);
    const {
        events,
        isInitialLoading,
        isFetchingMore,
        error,
        hasMore,
        loadMore,
    } = useEventList({
        filters,
        containerHeight,
    });

    const renderContent = () => {
        if (isInitialLoading) {
            return <Skeleton count={8}/>;
        }

        if (error) {
            return <div className={styles.error}>{error}</div>;
        }

        if (events.length === 0) {
            return <div className={styles.empty}>Событий не найдено</div>;
        }

        return (
            <EventList
                events={events}
                hasMore={hasMore}
                isFetchingMore={isFetchingMore}
                onLoadMore={loadMore}
            />
        );
    };

    return (
        <div className={styles.page} ref={containerRef}>
            <div className={styles.filters}>
                <EventFilters filters={filters} onChange={setFilters} />
            </div>
            <div className={styles.content}>
                {renderContent()}
            </div>
        </div>
    );
};
