import React, {lazy, Suspense, useEffect, useMemo, useRef, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';
import {
    selectCurrentAuthData,
    selectListData,
    selectMoviePairs,
    selectScreenPairs
} from '../selectors/CalendarSelectos';
import {eventDidMountFunctions, filterEventsBetweenDates, getStartAndEndOfDay} from '../helper/functions';
import {Card, Typography, useMediaQuery, useTheme} from '@mui/material';
import CalendarStyled from "../helper/CalendarStyled";
import {useDispatch, useSelector} from "react-redux";
import {openSnackbar} from "../../../store/slices/data_snackbar";
import MainCard from "../../../utils/general/MainCard";
import CalendarHeader from "../components/CalendarHeader";
import {asyncGetAllEvent, asyncUpdateEvent} from "../../../store/slices/data_calendar";
import {asyncFindMovieKeyLabels} from "../../../store/slices/data_movies";
import {asyncFindScreenKeyLabels} from "../../../store/slices/data_screen";
import CalendarViewEventsModal from "../components/CalendarViewEventsModal/containers/CalendarViewEventsModal";
import RecordsCard from "../components/RecordsCard";

const GeneralDialog = lazy(() => import('../../../utils/general/GeneralDialog'));
const CalendarAddEventModal = lazy(() => import('../components/CalendarAddEventModal/containers/CalendarAddEventModal'));

const Calendar = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const calendarRef = useRef(null);
    const events = useSelector(selectListData);
    const authData = useSelector(selectCurrentAuthData);
    const moviePairs = useSelector(selectMoviePairs);
    const screenPairs = useSelector(selectScreenPairs);

    const isAuthorized = useMemo(
        () => authData.roles.some(role => ['ADMIN', 'TICKET_ADMIN'].includes(role)),
        [authData]
    );
    const calendarView = isMobile ? 'listWeek' : 'dayGridMonth';

    const [open, setOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedRange, setSelectedRange] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [date, setDate] = useState(new Date());
    const [dialogOpen, setDialogOpen] = useState({open: false, action: ''});
    const [eventsOnClickedDate, setEventsOnClickedDate] = useState([]);
    const [eventDate, setEventDate] = useState(null);

    useEffect(() => {
        dispatch(asyncGetAllEvent());
        if (isAuthorized) {
            dispatch(asyncFindMovieKeyLabels());
            dispatch(asyncFindScreenKeyLabels());
        }
    }, [dispatch, isAuthorized]);

    useEffect(() => {
        const calendarEl = calendarRef.current;
        if (!calendarEl) return;

        const calendarApi = calendarEl.getApi();
        if (calendarApi.view.type !== calendarView) {
            calendarApi.changeView(calendarView);
            setDate(calendarApi.getDate());
        }
    }, [calendarView]);

    const calendarEvents = useMemo(() => {
        return events.map((e) => ({
            id: String(e?.calendarId),
            title: e?.movieTitle,
            start: `${e?.eventDate}T${e?.startTime}`,
            end: `${e?.eventDate}T${e?.endTime}`,
            allDay: false,
            extendedProps: {
                calendarId: e?.calendarId,
                screenId: e?.screenId,
                screenCode: e?.screenCode,
                screenName: e?.screenName,
                screenDescription: e?.screenDescription,
                capacity: e?.capacity,

                movieId: e?.movieId,
                movieTitle: e?.movieTitle,

                eventDate: e?.eventDate,
                startTime: e?.startTime,
                endTime: e?.endTime,

                reservedCount: e?.reservedCount,
                checkedInCount: e?.checkedInCount,
                availableSeats: e?.availableSeats,
                occupancyPercent: e?.occupancyPercent,

                status: e?.status,
                description: e?.description,
                version: e?.version,
            }
        }));
    }, [events]);

    const handleModalClose = () => {
        setIsAddModalOpen(false);
        setSelectedEvent(null);
        setSelectedRange(null);
    };

    const handleDateToday = () => {
        const calendarEl = calendarRef.current;

        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.today();
            setDate(calendarApi.getDate());
        }
    };

    const handleDatePrev = () => {
        const calendarEl = calendarRef.current;

        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.prev();
            setDate(calendarApi.getDate());
        }
    };

    const handleDateNext = () => {
        const calendarEl = calendarRef.current;

        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.next();
            setDate(calendarApi.getDate());
        }
    };

    const handleRangeSelect = (arg) => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.unselect();
        }

        setSelectedRange({
            start: arg.start,
            end: arg.end
        });

        const {startDate, endOfDay} = getStartAndEndOfDay(arg.start);
        const eventsOnDate = filterEventsBetweenDates(startDate, endOfDay, calendarEvents);

        if (eventsOnDate?.length <= 0) {
            setIsAddModalOpen(true);
        }
    };

    const handleDateClick = (arg) => {
        setEventsOnClickedDate([]);
        const {startDate, endOfDay} = getStartAndEndOfDay(arg.date);
        const eventsOnDate = filterEventsBetweenDates(startDate, endOfDay, calendarEvents);

        setEventDate(startDate);
        setEventsOnClickedDate(eventsOnDate);

        if (eventsOnDate?.length > 0) {
            setOpen(true);
        }
    };

    const handleEventSelect = (arg) => {
        setEventsOnClickedDate([]);

        const cId = arg?.event?._def?.extendedProps?.calendarId;
        if (cId) {
            const selectEvent = events.find((event) => event.calendarId === cId);
            setSelectedEvent(selectEvent);
        } else {
            setSelectedEvent(null);
        }

        const eventDate = new Date(arg.event.start);
        const {startDate, endOfDay} = getStartAndEndOfDay(eventDate);
        const eventsOnDate = filterEventsBetweenDates(startDate, endOfDay, calendarEvents);

        setEventsOnClickedDate(eventsOnDate);

        if (eventsOnDate?.length <= 0) {
            setIsAddModalOpen(true);
        } else {
            setEventDate(startDate);
            setOpen(true);
        }
    };

    const handleEventUpdateWhileDrop = (info) => {
        if (!isAuthorized) return;
        const {event} = info;
        const data = event?._def?.extendedProps;

        dispatch(
            asyncUpdateEvent({
                id: data?.calendarId,
                request: {
                    screenId: data?.screenId,
                    movieId: data?.movieId,
                    eventDate: new Date(event.start),
                    startTime: data?.startTime,
                    endTime: data?.endTime,
                    status: data?.status,
                    description: data?.description,
                    version: data?.version
                }
            })
        );
    };

    const handleAddClick = () => {
        if (!isAuthorized) return;
        setIsAddModalOpen(true);
    };

    return (
        <MainCard
            title={
                <CalendarHeader
                    handleAddClick={handleAddClick}
                    date={date}
                    onClickNext={handleDateNext}
                    onClickPrev={handleDatePrev}
                    onClickToday={handleDateToday}
                    isAuthorized={isAuthorized}
                />
            }
        >
            <CalendarStyled>
                <Card>
                    <FullCalendar
                        key={calendarView}
                        height={isMobile ? 'calc(100vh - 210px)' : 'calc(100vh - 242px)'}
                        weekends
                        editable
                        droppable
                        selectable
                        events={calendarEvents}
                        ref={calendarRef}
                        rerenderDelay={10}
                        initialDate={date}
                        initialView={calendarView}
                        views={{
                            dayGridMonth: {type: 'dayGridMonth'},
                            listWeek: {type: 'listWeek'}
                        }}
                        dayMaxEventRows={isMobile ? 1 : 3}
                        eventDisplay="block"
                        headerToolbar={false}
                        allDayMaintainDuration
                        eventResizableFromStart
                        select={handleRangeSelect}
                        dateClick={handleDateClick}
                        eventDrop={handleEventUpdateWhileDrop}
                        eventClick={handleEventSelect}
                        eventResize={handleEventUpdateWhileDrop}
                        eventDidMount={(info) => eventDidMountFunctions(info, theme)}
                        eventContent={isMobile ? undefined : (eventInfo) => (
                            <RecordsCard eventInfo={eventInfo}/>
                        )}
                        noEventsContent={
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center'
                                }}
                            >
                                <Typography>
                                    No events scheduled for this week.
                                </Typography>
                                <Typography>
                                    Try moving to another week.
                                </Typography>
                            </div>
                        }
                        plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
                        eventAllow={() => {
                            if (!isAuthorized) {
                                dispatch(
                                    openSnackbar({
                                        open: true,
                                        message: "You can't move this event!",
                                        type: 'alert',
                                    })
                                );
                                return false;
                            }
                            return true;
                        }}
                    />
                </Card>
            </CalendarStyled>

            {isAddModalOpen && isAuthorized && (
                <Suspense fallback={<></>}>
                    <CalendarAddEventModal
                        isAddModalOpen={isAddModalOpen}
                        handleClose={handleModalClose}
                        selectedEvent={selectedEvent}
                        range={selectedRange}
                        moviePairs={moviePairs}
                        screenPairs={screenPairs}
                    />
                </Suspense>
            )}

            {open && (
                <Suspense fallback={<></>}>
                    <CalendarViewEventsModal
                        open={open}
                        handleClose={() => {
                            setOpen(false);
                            setSelectedEvent(null);
                        }}
                        events={eventsOnClickedDate}
                        setSelectedEvent={(v) => {
                            setSelectedEvent(v);
                            setIsAddModalOpen(true);
                            setOpen(false);
                        }}
                        eventDate={eventDate}
                        isAuthorized={isAuthorized}
                    />
                </Suspense>
            )}

            {dialogOpen?.open && isAuthorized && (
                <Suspense fallback={<></>}>
                    <GeneralDialog
                        isOpen={dialogOpen.open}
                        handleClose={() => setDialogOpen({open: false, action: ''})}
                        title={dialogOpen.action === 'delete' ? 'Delete' : 'Update'}
                        message={
                            dialogOpen.action === 'delete'
                                ? 'Are you sure you want to delete the event?'
                                : 'Are you sure you want to update the event?'
                        }
                        buttonName={'Confirm'}
                    />
                </Suspense>
            )}
        </MainCard>
    );
};

export default Calendar;