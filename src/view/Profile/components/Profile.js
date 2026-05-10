import React, { useState } from 'react';
import {
    Box,
    Grid,
    Typography,
    Avatar,
    Button,
    TextField,
    Divider,
    Stack,
    Switch,
    FormControlLabel,
    InputAdornment,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import { Visibility, VisibilityOff, PhotoCamera } from '@mui/icons-material';
import MainCard from '../../../utils/general/MainCard';
import CustomTabs from '../../../utils/general/CustomTabs';

const TAB_ITEMS = [
    { label: 'Personal Details' },
    { label: 'Preferences' },
    { label: 'Security' }
];

const Profile = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [showPassword, setShowPassword] = useState(false);

    const [userInfo, setUserInfo] = useState({
        role: 'Customer', // 'Customer', 'Owner', 'Agency'
        firstName: 'John',
        lastName: 'Doe',
        agencyName: '',
        licenseNumber: '',
        email: 'john.doe@example.com',
        phone: '+1 234 567 8900',
        address: '123 Real Estate Blvd, Suite 100',
        city: 'New York',
        country: 'USA'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 0: // Personal Details
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Profile Type</InputLabel>
                                <Select
                                    label="Profile Type"
                                    name="role"
                                    value={userInfo.role}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="Customer">Customer</MenuItem>
                                    <MenuItem value="Owner">Property Owner</MenuItem>
                                    <MenuItem value="Agency">Agency</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {userInfo.role === 'Agency' && (
                            <>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Agency Name"
                                        name="agencyName"
                                        value={userInfo.agencyName}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="License Number"
                                        name="licenseNumber"
                                        value={userInfo.licenseNumber}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                    />
                                </Grid>
                            </>
                        )}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={userInfo.firstName}
                                onChange={handleInputChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={userInfo.lastName}
                                onChange={handleInputChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                name="email"
                                type="email"
                                value={userInfo.email}
                                onChange={handleInputChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                name="phone"
                                value={userInfo.phone}
                                onChange={handleInputChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Address"
                                name="address"
                                value={userInfo.address}
                                onChange={handleInputChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="City"
                                name="city"
                                value={userInfo.city}
                                onChange={handleInputChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Country"
                                name="country"
                                value={userInfo.country}
                                onChange={handleInputChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                <Button variant="contained" color="primary">
                                    Save Changes
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                );
            case 1: // Preferences
                return (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography variant="h6">Notifications</Typography>
                        <FormControlLabel
                            control={<Switch defaultChecked color="primary" />}
                            label="Email me when someone messages me"
                        />
                        {userInfo.role === 'Customer' && (
                            <FormControlLabel
                                control={<Switch defaultChecked color="primary" />}
                                label="Email me about new properties matching my criteria"
                            />
                        )}
                        {userInfo.role === 'Owner' && (
                            <FormControlLabel
                                control={<Switch defaultChecked color="primary" />}
                                label="Email me when someone shows interest in my properties"
                            />
                        )}
                        {userInfo.role === 'Agency' && (
                            <FormControlLabel
                                control={<Switch defaultChecked color="primary" />}
                                label="Email me about newly listed properties on the platform"
                            />
                        )}
                        <FormControlLabel
                            control={<Switch color="primary" />}
                            label="Send SMS notifications for upcoming viewings"
                        />
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6">Privacy</Typography>
                        <FormControlLabel
                            control={<Switch defaultChecked color="primary" />}
                            label="Show my profile in the public directory"
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button variant="contained" color="primary">
                                Save Preferences
                            </Button>
                        </Box>
                    </Box>
                );
            case 2: // Security
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Current Password"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="New Password"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Confirm New Password"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                <Button variant="contained" color="primary">
                                    Update Password
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                );
            default:
                return null;
        }
    };

    return (
        <Grid container spacing={3}>
            {/* Left Column: User Profile Summary */}
            <Grid item xs={12} md={4}>
                <MainCard sx={{ textAlign: 'center', p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, position: 'relative' }}>
                        <Avatar
                            alt="User Profile"
                            src="/apartments/apart1.jpg"
                            sx={{ width: 120, height: 120, border: '4px solid white', boxShadow: 2 }}
                        />
                        <IconButton
                            color="primary"
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                right: '50%',
                                transform: 'translateX(60px)',
                                backgroundColor: 'background.paper',
                                '&:hover': { backgroundColor: 'background.default' },
                                boxShadow: 1
                            }}
                        >
                            <PhotoCamera />
                        </IconButton>
                    </Box>
                    <Typography variant="h5" fontWeight="bold">
                        {userInfo.role === 'Agency' && userInfo.agencyName ? userInfo.agencyName : `${userInfo.firstName} ${userInfo.lastName}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {userInfo.role === 'Agency' ? 'Real Estate Agency' : userInfo.role === 'Owner' ? 'Property Owner' : 'Customer'}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Stack spacing={2} textAlign="left">
                        <Box>
                            <Typography variant="caption" color="text.secondary">Email</Typography>
                            <Typography variant="body2">{userInfo.email}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="caption" color="text.secondary">Phone</Typography>
                            <Typography variant="body2">{userInfo.phone}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="caption" color="text.secondary">Location</Typography>
                            <Typography variant="body2">{userInfo.city}, {userInfo.country}</Typography>
                        </Box>
                    </Stack>
                </MainCard>
            </Grid>

            {/* Right Column: Profile Details & Settings */}
            <Grid item xs={12} md={8}>
                <MainCard>
                    <Box sx={{ mb: 3 }}>
                        <CustomTabs tab={activeTab} setTab={setActiveTab} items={TAB_ITEMS} />
                    </Box>
                    <Divider sx={{ mb: 3 }} />
                    {renderTabContent()}
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default Profile;
