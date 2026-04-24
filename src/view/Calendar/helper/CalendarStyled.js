// material-ui
import { styled } from '@mui/material/styles';

const CalendarStyled = styled('div')(({ theme }) => ({
    // hide license message
    '& .fc-license-message': {
        display: 'none'
    },

    // fullcalendar base styling
    '& .fc': {
        '--fc-bg-event-opacity': 1,
        '--fc-border-color': theme.palette.divider,

        '--fc-daygrid-event-dot-width': '10px',
        '--fc-list-event-dot-width': '10px',

        // today highlight
        '--fc-today-bg-color':
            theme.palette.mode === 'dark'
                ? 'rgba(30, 58, 138, 0.18)'   // deep blue tint
                : 'rgba(30, 58, 138, 0.08)',

        // event border + bar
        '--fc-event-border-color': theme.palette.primary.dark,
        '--fc-now-indicator-color': theme.palette.secondary.main,

        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily
    },

    // date text
    '& .fc .fc-daygrid-day-top': {
        display: 'grid',
        '& .fc-daygrid-day-number': {
            textAlign: 'center',
            marginTop: 12,
            marginBottom: 12,
            color:
                theme.palette.mode === 'dark'
                    ? theme.palette.grey[200]
                    : theme.palette.grey[800]
        }
    },

    // weekday headers
    '& .fc .fc-col-header-cell': {
        backgroundColor:
            theme.palette.mode === 'dark'
                ? '#111827' // matching dark bg tint
                : '#E2E8F0' // light grey-blue tint
    },

    '& .fc .fc-col-header-cell-cushion': {
        color:
            theme.palette.mode === 'dark'
                ? theme.palette.grey[100]
                : '#1E3A8A', // make weekdays deep blue
        padding: 16,
        fontWeight: 600
    },

    // events
    '& .fc-h-event': {
        backgroundColor: theme.palette.primary.main,
        border: 'none',
        color: '#fff',
        borderRadius: 8,
        boxShadow:
            theme.palette.mode === 'dark'
                ? '0 2px 6px rgba(0,0,0,0.4)'
                : '0 2px 6px rgba(0,0,0,0.15)'
    },

    '& .fc-h-event .fc-event-main': {
        padding: 6,
        paddingLeft: 10,
    },

    // popover
    '& .fc .fc-more-popover': {
        border: 'none',
        borderRadius: 14
    },

    '& .fc .fc-more-popover .fc-popover-body': {
        backgroundColor:
            theme.palette.mode === 'dark'
                ? '#1E293B' // slate-800
                : '#F8FAFC', // slate-50
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12
    },

    '& .fc .fc-popover-header': {
        padding: 12,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        backgroundColor:
            theme.palette.mode === 'dark'
                ? '#1E293B'
                : '#E2E8F0',
        color:
            theme.palette.mode === 'dark'
                ? theme.palette.grey[100]
                : theme.palette.primary.main,
        fontWeight: 600
    },

    // agenda/list view
    '& .fc-theme-standard .fc-list-day-cushion': {
        backgroundColor:
            theme.palette.mode === 'dark'
                ? '#111827'
                : '#E2E8F0',
        color:
            theme.palette.mode === 'dark'
                ? theme.palette.grey[200]
                : theme.palette.primary.main,
        fontWeight: 600
    },

    '& .fc .fc-list-event:hover td': {
        backgroundColor:
            theme.palette.mode === 'dark'
                ? 'rgba(30, 58, 138, 0.18)'
                : 'rgba(30, 58, 138, 0.08)'
    },

    // timegrid events
    '& .fc-timegrid-event': {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 10,
        border: 'none',
        color: '#000',
        fontWeight: 600,
        boxShadow:
            theme.palette.mode === 'dark'
                ? '0 2px 6px rgba(0,0,0,0.5)'
                : '0 2px 6px rgba(0,0,0,0.15)'
    }
}));

export default CalendarStyled;
