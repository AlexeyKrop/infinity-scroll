import {format} from 'date-fns';
import {ru, enUS} from 'date-fns/locale';

export const locales = {
    ru,
    en: enUS,
} as const;

export type SupportedLocale = keyof typeof locales;

export type FormattedDate = {
    date: string;
    time: string;
    full: string;
};

export type FormatDateOptions = {
    locale?: SupportedLocale;
    dateFormat?: string;
    timeFormat?: string;
    fullFormat?: string;
};

const defaultOptions: Required<FormatDateOptions> = {
    locale: 'ru',
    dateFormat: 'dd MMM yyyy',
    timeFormat: 'HH:mm',
    fullFormat: 'dd MMM yyyy, HH:mm',
};

export const formatDate = (date: Date, options: FormatDateOptions = {}): FormattedDate => {
    const {locale: localeName, dateFormat, timeFormat, fullFormat,} = {...defaultOptions, ...options};
    const locale = locales[localeName];
    const formatOptions = {locale};

    return {
        date: format(date, dateFormat, formatOptions),
        time: format(date, timeFormat, formatOptions),
        full: format(date, fullFormat, formatOptions),
    };
};
