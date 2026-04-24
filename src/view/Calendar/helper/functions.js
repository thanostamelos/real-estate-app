import {format, isSameDay} from 'date-fns';

const dateTimeInputFormatWithoutSeconds = 'dd/MM/yyyy HH:mm';

export const formatEventTime = (start, end, eventDate) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const eventDateObj = new Date(eventDate);

    const isStartSameDay = isSameDay(startDate, eventDateObj);
    const isEndSameDay = isSameDay(endDate, eventDateObj);

    if (isStartSameDay && isEndSameDay) {
        return `${format(startDate, 'HH:mm')} - ${format(endDate, 'HH:mm')}`;
    } else {
        const startFormatted = isStartSameDay ? format(startDate, 'HH:mm') : format(startDate, dateTimeInputFormatWithoutSeconds);
        const endFormatted = isEndSameDay ? format(endDate, 'HH:mm') : format(endDate, dateTimeInputFormatWithoutSeconds);

        return `${startFormatted} - ${endFormatted}`;
    }
};

export const filterEventsBetweenDates = (startDate, endOfDay, events) => {
    return events.filter((event) => {
        const eventStart = new Date(event?.start);
        const eventEnd = new Date(event?.end);

        if (event.end && event.start) {
            return (
                (eventStart >= startDate && eventStart < endOfDay) ||
                (eventEnd >= startDate && eventEnd < endOfDay) ||
                (eventStart < startDate && eventEnd > endOfDay)
            );
        }
    });
};

export const getStartAndEndOfDay = (date) => {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startDate);
    endOfDay.setHours(23, 59, 59, 999);

    return {startDate, endOfDay};
};

export const removeZeros = (time) => {
    if (!time || typeof time !== 'string') return '--:--';
    return time.split(':').slice(0, 2).join(':');
};

const CARD_COLORS = [
    '#5b6877',
    '#52796F',
    '#6b577e',
    '#4A6B8C'
];

export const getCardColor = (eventInfo) => {
    if (!eventInfo?.event?.start || !eventInfo?.view?.calendar) return CARD_COLORS[0];

    const currentStart = eventInfo.event.start;
    const allEvents = eventInfo.view.calendar.getEvents();

    const dayEvents = allEvents.filter((e) =>
        e.start && e.start.toDateString() === currentStart.toDateString()
    );

    dayEvents.sort((a, b) => {
        const timeDiff = a.start.getTime() - b.start.getTime();
        if (timeDiff === 0) {
            return String(a.id).localeCompare(String(b.id));
        }
        return timeDiff;
    });

    const eventIndex = dayEvents.findIndex((e) => e.id === eventInfo.event.id);

    return eventIndex !== -1 ? CARD_COLORS[eventIndex % CARD_COLORS.length] : CARD_COLORS[0];
};


export const eventDidMountFunctions = (info, theme) => {
    info.el.style.backgroundColor = theme.palette.calendar.cardColors[1];
    info.el.style.borderColor = theme.palette.calendar.cardColors[1];
};