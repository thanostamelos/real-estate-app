import {Button} from "@mui/material";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import SimpleTextFilter from "../../../../utils/filters/SimpleTextField";
import EndAdornment from "../AuthCreateAccount/EndAdornment";
import * as yup from "yup";
import {useFormik} from "formik";
import {FIELD_STYLES} from "../../helper/helper";
import {useLocation, useNavigate} from "react-router-dom";

const AuthLoginStandard = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [fieldType, setFieldType] = useState(true)

    const from = location.state?.from?.pathname ?? '/';

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: navigate(from, {replace: true})
    });

    return (
        <>
            <SimpleTextFilter
                name="email"
                label="Email"
                value={formik?.values?.email}
                sx={FIELD_STYLES}
                required={true}
                formik={formik}
                onEnterPress={(event) => {
                    if (event.key === 'Enter') {
                        formik?.handleSubmit()
                    }
                }}
            />
            <SimpleTextFilter
                name="password"
                label="Password"
                type={fieldType ? 'password' : 'text'}
                value={formik?.values?.password}
                sx={FIELD_STYLES}
                endAdornment={<EndAdornment fieldType={fieldType} setFieldType={setFieldType}/>}
                required={true}
                formik={formik}
                onEnterPress={(event) => {
                    if (event.key === 'Enter') {
                        formik?.handleSubmit()
                    }
                }}
            />

            <Button
                variant="contained"
                onClick={formik?.handleSubmit}
            >
                Log in
            </Button>
        </>
    )
}

export default AuthLoginStandard;