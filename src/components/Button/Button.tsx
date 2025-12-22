import {type ReactNode, type MouseEventHandler} from 'react';
import {Button as HButton} from '@headlessui/react';
import clsx from 'clsx';

import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export type ButtonSize = 'small' | 'medium' | 'large'

type ButtonProps = {
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
};

export const Button = (props: ButtonProps) => {
    const {
        children,
        onClick,
        variant = 'primary',
        size = 'medium',
        disabled = false,
        className,
        type = 'button',
    } = props;

    const buttonClasses = clsx(
        styles.button,
        styles[variant],
        styles[size],
        className
    );

    return (
        <HButton
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={buttonClasses}
        >
            {children}
        </HButton>
    );
};
