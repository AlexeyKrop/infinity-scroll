import {useEffect, useRef, useState} from 'react';
import clsx from "clsx";
import {useEventList} from '../../store';
import {Skeleton} from "../../components";
import {useEventFilters} from "../_shared";
import {EventFilters} from './EventFilters/EventFilters.tsx';
import {EventList} from "./EventList/EventList.tsx";


import styles from './EventsPage.module.scss';


export const EventsPage = () => {
    const {filters, setFilters, clearFilters, hasActiveFilters} = useEventFilters();
    const [containerHeight, setContainerHeight] = useState<number>();
    const containerRef = useRef<HTMLDivElement>(null);
    const [isSticky, setIsSticky] = useState<boolean>(false);
    const filtersRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            setContainerHeight(containerRef.current.clientHeight);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (filtersRef.current) {
                const filtersTop = filtersRef.current.getBoundingClientRect().top;
                setIsSticky(filtersTop <= 0);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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
            return <Skeleton count={5}/>;
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
            <div
                className={clsx(styles.filters, {
                    [styles.sticky]: isSticky
                })}
                ref={filtersRef}
            >
                <EventFilters
                    filters={filters}
                    onChange={setFilters}
                    hasActiveFilters={hasActiveFilters}
                    onClear={clearFilters}
                />
            </div>
            <div className={styles.content}>
                {renderContent()}
            </div>
        </div>
    );
};
