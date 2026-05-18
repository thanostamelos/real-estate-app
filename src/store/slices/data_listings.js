import {createSlice} from '@reduxjs/toolkit';
import {LISTINGS} from '../../view/Home/helper/apartmentsList';

let nextId = LISTINGS.length + 1;

const data_listings = createSlice({
    name: 'data_listings',
    initialState: {
        listings: LISTINGS
    },
    reducers: {
        addListing(state, action) {
            const payload = action.payload;
            state.listings.unshift({
                listingId: nextId++,
                datePosted: new Date().toISOString().split('T')[0],
                status: 'active',
                views: 0,
                rating: 0,
                property: payload.property,
                owner: payload.owner
            });
        },
        rateListing(state, action) {
            const {listingId, rating} = action.payload;
            const listing = state.listings.find(l => l.listingId === listingId);
            if (listing) listing.rating = rating;
        }
    }
});

export default data_listings.reducer;
export const {addListing, rateListing} = data_listings.actions;
export const selectListings = (state) => state.data_listings.listings;
