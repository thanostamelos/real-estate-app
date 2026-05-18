import React, {useMemo, useState} from "react";
import PostCard from "../../PostCard/containers/PostCard";
import {useTheme} from "@mui/material/styles";
import {useDispatch, useSelector} from "react-redux";
import {
    selectLocation,
    selectMaxPrice,
    selectMinPrice,
    selectPropertyType,
    selectSearchTerm,
    selectStatus
} from "../selectors/HomeSelectors";
import {
    resetFilter,
    setMaxPrice,
    setMinPrice,
    setPropertyType,
    setStatus
} from "../../../store/slices/data_searchbar";
import {selectListings} from "../../../store/slices/data_listings";
import {Box, Button, MenuItem, Select, TextField, Typography} from "@mui/material";
import ListingModal from "../../ListingModal/ListingModal";

const PROPERTY_TYPES = ["Apartment", "House", "Studio", "Loft", "Penthouse"];

export default function Home() {
    const theme = useTheme();
    const dispatch = useDispatch();

    const searchTerm = useSelector(selectSearchTerm);
    const location = useSelector(selectLocation);
    const propertyType = useSelector(selectPropertyType);
    const status = useSelector(selectStatus);
    const minPrice = useSelector(selectMinPrice);
    const maxPrice = useSelector(selectMaxPrice);
    const listings = useSelector(selectListings);

    const [selectedListing, setSelectedListing] = useState(null);

    const filteredListings = useMemo(() => {
        const term = searchTerm?.toLowerCase().trim();
        const loc = location?.toLowerCase().trim();

        return listings.filter((listing) => {
            const p = listing.property;

            const matchesLocation = loc ? p.location?.toLowerCase().includes(loc) : true;
            const matchesType = propertyType ? p.type === propertyType : true;
            const matchesStatus = status ? p.status === status : true;
            const matchesMinPrice = minPrice ? p.price >= Number(minPrice) : true;
            const matchesMaxPrice = maxPrice ? p.price <= Number(maxPrice) : true;
            const matchesSearch = term
                ? [p.title, p.description, p.location, p.type, p.address,
                    p.status, String(p.price), listing.owner.username, listing.owner.email]
                    .some(val => val?.toLowerCase().includes(term))
                : true;

            return matchesLocation && matchesType && matchesStatus && matchesMinPrice && matchesMaxPrice && matchesSearch;
        });
    }, [listings, searchTerm, location, propertyType, status, minPrice, maxPrice]);

    return (
        <div style={{
            minHeight: "100vh",
            padding: 40,
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            {/* SearchProperty filters */}
            <Box sx={{
                width: "100%", maxWidth: 1400,
                display: "flex", flexWrap: "wrap", gap: 1.5, mb: 4, alignItems: "center"
            }}>
                <Select size="small" displayEmpty value={status}
                    onChange={(e) => dispatch(setStatus(e.target.value))}
                    sx={{minWidth: 130, bgcolor: theme.palette.background.paper}}>
                    <MenuItem value=""><em>All (Sale/Rent)</em></MenuItem>
                    <MenuItem value="sale">For Sale</MenuItem>
                    <MenuItem value="rent">For Rent</MenuItem>
                </Select>

                <Select size="small" displayEmpty value={propertyType}
                    onChange={(e) => dispatch(setPropertyType(e.target.value))}
                    sx={{minWidth: 140, bgcolor: theme.palette.background.paper}}>
                    <MenuItem value=""><em>All Types</em></MenuItem>
                    {PROPERTY_TYPES.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                </Select>

                <TextField size="small" placeholder="Min Price (€)" type="number"
                    value={minPrice} onChange={(e) => dispatch(setMinPrice(e.target.value))}
                    sx={{width: 130, bgcolor: theme.palette.background.paper}}/>

                <TextField size="small" placeholder="Max Price (€)" type="number"
                    value={maxPrice} onChange={(e) => dispatch(setMaxPrice(e.target.value))}
                    sx={{width: 130, bgcolor: theme.palette.background.paper}}/>

                <Button size="small" variant="outlined" onClick={() => dispatch(resetFilter())}>
                    Reset Filters
                </Button>

                <Typography variant="body2" color="text.secondary" sx={{ml: "auto"}}>
                    {filteredListings.length} listing{filteredListings.length !== 1 ? "s" : ""} found
                </Typography>
            </Box>

            {/* Listings grid */}
            <div style={{
                width: "100%", maxWidth: 1400,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 24, alignItems: "start"
            }}>
                {filteredListings.map((listing) => (
                    <PostCard
                        key={listing.listingId}
                        listing={listing}
                        onClick={() => setSelectedListing(listing)}
                    />
                ))}
            </div>

            {selectedListing && (
                <ListingModal
                    listing={selectedListing}
                    onClose={() => setSelectedListing(null)}
                />
            )}
        </div>
    );
}
