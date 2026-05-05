import { useState } from "react";
import { Box, Paper, InputBase, IconButton, Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const [location, setLocation] = useState("");

    const handleSearch = () => {
        onSearch?.({ query, location });
    };

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
            {/* Property type / keyword */}
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Π.χ. διαμέρισμα, μονοκατοικία..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            {/* Location */}
            <Box sx={{ display: "flex", alignItems: "center", px: 1 }}>
                <LocationOnIcon fontSize="small" />
                <InputBase
                    sx={{ ml: 0.5, width: 140 }}
                    placeholder="Περιοχή"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </Box>

            {/* Search button */}
            <IconButton onClick={handleSearch} sx={{ p: "10px" }}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};

export default SearchBar;
