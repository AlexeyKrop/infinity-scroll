import clsx from 'clsx';
import styles from './Skeleton.module.scss';

type SkeletonProps = {
    count?: number;
};

export const Skeleton = (props: SkeletonProps) => {
    const {count = 1} = props;
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className={styles.skeleton}>
                    <div className={styles.circle} />
                    <div className={styles.content}>
                        <div className={clsx(styles.line, styles.short)} />
                        <div className={clsx(styles.line, styles.long)} />
                        <div className={clsx(styles.line, styles.medium)} />
                    </div>
                </div>
            ))}
        </>
    );
};
