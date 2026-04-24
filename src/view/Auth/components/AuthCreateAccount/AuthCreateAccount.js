import {Button, Typography} from "@mui/material";
import React, {useState} from "react";
import SimpleTextFilter from "../../../../utils/filters/SimpleTextField";
import EndAdornment from "./EndAdornment";
import SimpleDateFilter from "../../../../utils/filters/SimpleDateFilter";
import {useDispatch} from "react-redux";
import * as yup from 'yup';
import {useFormik} from "formik";
import {FIELD_STYLES} from "../../helper/helper";
import AuthLoginGoogle from "../AuthLogin/AuthLoginGoogle";
import {useNavigate} from "react-router-dom";

const AuthCreateAccount = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [fieldType, setFieldType] = useState(true)

    const validationSchema = yup.object({
        email: yup.string().required('Email is required'),
        password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('Last name is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            dateOfBirth: null,
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                navigate('/login', {replace: true});
            } catch (e) {

            }
        }
    });

    return (
        <>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant="h5" sx={{fontWeight: 900}}>Create Account</Typography>
                <Typography
                    variant="h6"
                    fontSize={12}
                    sx={{textDecoration: 'underline', cursor: 'pointer'}}
                    onClick={() => navigate('/login')}
                >
                    Already have an account
                </Typography>
            </div>

            <SimpleTextFilter
                name="email"
                label="Email"
                value={formik.values.email}
                sx={FIELD_STYLES}
                required={true}
                formik={formik}
            />
            <SimpleTextFilter
                name="password"
                label="Password"
                type={fieldType ? 'password' : 'text'}
                value={formik.values.password}
                sx={FIELD_STYLES}
                endAdornment={<EndAdornment fieldType={fieldType} setFieldType={setFieldType}/>}
                required={true}
                formik={formik}
            />
            <SimpleTextFilter
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                sx={FIELD_STYLES}
                required={true}
                formik={formik}
            />
            <SimpleTextFilter
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                sx={FIELD_STYLES}
                required={true}
                formik={formik}
            />
            <SimpleDateFilter
                name={'dateOfBirth'}
                label="Date of birth"
                value={formik.values.dateOfBirth}
                sx={{height: 40, width: '100%'}}
                formik={formik}
            />

            <Button
                variant="contained"
                onClick={formik.handleSubmit}
                disabled={!formik.isValid || !formik.dirty}
            >
                Sign in
            </Button>
            <AuthLoginGoogle/>
        </>
    )
}

export default AuthCreateAccount;