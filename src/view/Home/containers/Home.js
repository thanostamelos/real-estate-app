import React, {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectAuthData, selectCalendar, selectCalendarLoading} from "../selectors/HomeSelectors";
import NowPlaying from "../../NowPlaying/containers/NowPlaying";
import {useNavigate} from "react-router-dom";
import SimpleButton from "../../../utils/Buttons/SimpleButton";
import {asyncGetAllEvent} from "../../../store/slices/data_calendar";
import {useTheme} from "@mui/material/styles";

export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();

    const isLoading = useSelector(selectCalendarLoading);
    const screenings = useSelector(selectCalendar);
    const authData = useSelector(selectAuthData);
    const isAuth = authData?.isAuthenticated;

    useEffect(() => {
        if (!isAuth) return;

        dispatch(asyncGetAllEvent());
    }, [dispatch, isAuth]);

    const normalizedScreenings = useMemo(() => {
        return Array.isArray(screenings) ? screenings : [];
    }, [screenings]);

    const textStyles = {
        fontSize: 18,
        marginBottom: 20,
        opacity: 0.9,
        color: theme.palette.text.default,
    };

    return (
        <div style={{
            minHeight: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: isAuth ? 0 : 40,
            color: theme.palette.text.default,
            backgroundColor: theme.palette.background.default,
        }}>
            <div style={{
                background: theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.06)'
                    : 'rgba(255,255,255,0.85)',
                backdropFilter: "blur(12px)",
                borderRadius: 20,
                padding: isAuth ? 10 : 40,
                width: "100%",
                maxWidth: 700,
                textAlign: "center",
                boxShadow:
                    theme.palette.mode === 'dark'
                        ? '0 10px 30px rgba(0,0,0,0.45)'
                        : '0 10px 30px rgba(15,23,42,0.10)',
                border: `1px solid ${
                    theme.palette.mode === 'dark'
                        ? 'rgba(255,255,255,0.08)'
                        : 'rgba(30,58,138,0.08)'
                }`,
                color: theme.palette.text.default,
            }}>

                <h1 style={{
                    fontSize: 42,
                    fontWeight: 700,
                    marginBottom: 10,
                    color: theme.palette.primary.main,
                }}>
                    🎬 Booking Cinema
                </h1>

                <h2 style={{
                    fontSize: 24,
                    marginBottom: 30,
                    opacity: 0.9,
                    color: theme.palette.text.default,
                }}>
                    Welcome {authData?.firstName || "Guest"}
                </h2>

                {!isAuth && (
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 20,
                        alignItems: "center"
                    }}>
                        <p style={textStyles}>
                            Login or create an account to start booking your favorite movies
                        </p>

                        <SimpleButton
                            name={'Login'}
                            onClick={() => navigate('/login')}
                        />
                    </div>
                )}

                {isAuth && (
                    <>
                        <p style={textStyles}>
                            Choose your movie and enjoy the experience 🍿
                        </p>
                        <SimpleButton name={'Reserve Now'} onClick={() => navigate('/reservation')}/>
                    </>
                )}

            </div>

            {isAuth && (
                <div style={{width: '100%', marginTop: 40}}>
                    <NowPlaying
                        isLoading={isLoading}
                        screenings={normalizedScreenings}
                    />
                </div>
            )}
        </div>
    );
}
