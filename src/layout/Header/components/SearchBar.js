import {useState} from "react";
import {Box, Divider, InputBase, Paper} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {useDispatch} from "react-redux";
import {setLocationTerm, setSearchTerm} from "../../../store/slices/data_searchbar";

const SearchBar = () => {
    const dispatch = useDispatch();

    const [query, setQuery] = useState("");
    const [location, setLocation] = useState("");

    const handleQuery = (value) => {
        dispatch(setSearchTerm(value));
    }

    const handleLocation = (value) => {
        dispatch(setLocationTerm(value));
    }

    return (
        <Paper
            elevation={3}
            sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: "50px",
                padding: "6px 10px",
                maxWidth: 700,
                width: "100%",
                margin: "0 auto",
            }}
        >
            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder="Π.χ. διαμέρισμα, μονοκατοικία..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    handleQuery(e.target.value);
                }}
            />

            <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>

            <Box sx={{display: "flex", alignItems: "center", px: 1}}>
                <LocationOnIcon fontSize="small"/>
                <InputBase
                    sx={{ml: 0.5, width: 140}}
                    placeholder="Περιοχή"
                    value={location}
                    onChange={(e) => {
                        setLocation(e.target.value);
                        handleLocation(e.target.value);
                    }}
                />
            </Box>

            <SearchIcon/>
        </Paper>
    );
};

export default SearchBar;
