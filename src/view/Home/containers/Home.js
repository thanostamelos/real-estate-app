import React, {useMemo} from "react";
import PostCard from "../../PostCard/containers/PostCard";
import {useTheme} from "@mui/material/styles";
import {APARTMENTS} from "../helper/apartmentsList";
import {useSelector} from "react-redux";
import {selectLocation, selectSearchTerm} from "../selectors/HomeSelectors";

export default function Home() {
    const theme = useTheme();

    const searchTerm = useSelector(selectSearchTerm);
    const location = useSelector(selectLocation);

    const filteredApartments = useMemo(() => {
        const term = searchTerm?.toLowerCase().trim();
        const loc = location?.toLowerCase().trim();

        return APARTMENTS.filter((item) => {
            // 1. LOCATION FILTER (μόνο location field)
            const matchesLocation = loc
                ? item.location?.toLowerCase().includes(loc)
                : true;

            // 2. GLOBAL SEARCH (όλα τα fields)
            const matchesSearch = term
                ? Object.values(item).some((value) => {
                    if (value === null || value === undefined) return false;

                    return value
                        .toString()
                        .toLowerCase()
                        .includes(term);
                })
                : true;

            return matchesLocation && matchesSearch;
        });
    }, [searchTerm, location]);

    return (
        <div
            style={{
                minHeight: "100vh",
                padding: 40,
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,

                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 24,

                justifyItems: "center",
                alignItems: "start"
            }}
        >
            {filteredApartments.map((item, i) => (
                <PostCard key={i} {...item} />
            ))}
        </div>
    );
}