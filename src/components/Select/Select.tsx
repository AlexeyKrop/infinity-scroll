import {Listbox, ListboxButton, ListboxOptions, ListboxOption} from '@headlessui/react';
import {ChevronDown, Check} from 'lucide-react';
import clsx from 'clsx';

import styles from './Select.module.scss';

type SelectOption = {
    value: string;
    label: string;
};

type SelectProps = {
    value: string;
    options: SelectOption[];
    onChange: (value: string) => void;
    placeholder?: string;
};

export const Select = (props: SelectProps) => {
    const {
        value,
        options,
        onChange,
        placeholder = 'Выберите...',
    } = props;

    const selectedOption = options.find(opt => opt.value === value);
    const displayValue = selectedOption ? selectedOption.label : placeholder;

    return (
        <Listbox value={value} onChange={onChange}>
            <div className={styles.select_wrapper}>
                <ListboxButton className={styles.select_button}>
                    <span>{displayValue}</span>
                    <ChevronDown size={16}/>
                </ListboxButton>

                <ListboxOptions
                    className={styles.select_options}
                    transition
                >
                    {options.map((option) => (
                        <ListboxOption
                            key={option.value}
                            value={option.value}
                            className={clsx(styles.select_option)}
                        >
                            {({selected}) => (
                                <>
                                    <span className={clsx({[styles.selected]: selected})}>
                                        {option.label}
                                    </span>
                                    {selected && <Check size={16}/>}
                                </>
                            )}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    );
};
