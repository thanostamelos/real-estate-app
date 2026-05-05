import {format} from "date-fns";
import {dateInputFormatReverse} from "../../constants/formatConstants";

export const defaultLabelFromName = (fieldName) => {
    if (!fieldName) return '';

    const s = String(fieldName)
        .replace(/[._-]+/g, ' ')
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
        .trim()
        .toLowerCase();

    return s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
};

export const formatDatesForBackEndSingle = (date) => {
    return date ? format(new Date(date), dateInputFormatReverse) : null;
};