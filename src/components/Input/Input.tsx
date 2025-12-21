import {Search} from 'lucide-react';
import {Input as HInput} from '@headlessui/react';
import clsx from 'clsx';
import styles from './Input.module.scss';

type InputProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: 'text' | 'search';
};

export const Input = (props: InputProps) => {
    const {value, onChange, placeholder, type = 'text'} = props;

    return (
        <div className={styles.wrapper}>
            {type === 'search' && <Search className={styles.icon} size={18}/>}
            <HInput
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={clsx(styles.input, {
                    [styles.input_with_icon]: type === 'search'
                })}
            />
        </div>
    );
};
