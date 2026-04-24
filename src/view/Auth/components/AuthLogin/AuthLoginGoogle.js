import {GoogleLogin} from "@react-oauth/google";
import React, {useState} from "react";
import {Typography} from "@mui/material";
import {useDispatch} from "react-redux";

const AuthLoginGoogle = () => {
    const dispatch = useDispatch();

    const [error, setError] = useState(false);

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const idToken = credentialResponse.credential;
            setError(false);
        } catch (e) {
            setError(true);
        }
    };

    return (
        <>
            <Typography variant="body2" color="text.secondary" sx={{textAlign: "center"}}>
                or
            </Typography>

            <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => setError(true)}
                useOneTap={false}
            />

            {error && (
                <Typography variant="body2" color="error">
                    Google login failed.
                </Typography>
            )}
        </>
    )
}

export default AuthLoginGoogle;