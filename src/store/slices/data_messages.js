import {createSlice} from '@reduxjs/toolkit';

// Αντιστοιχεί στην κλάση Message του UML διαγράμματος
// messageId, senderId, receiverId, title, content, issueDate

let nextMessageId = 1;

const CURRENT_USER_ID = 99; // Static "logged-in" Customer

const data_messages = createSlice({
    name: 'data_messages',
    initialState: {
        // { [listingId]: Message[] }
        conversations: {}
    },
    reducers: {
        // sendMessage() - αποστολή μηνύματος από Customer σε Owner
        sendMessage(state, action) {
            const {listingId, receiverId, content, title} = action.payload;

            const message = {
                messageId: nextMessageId++,
                senderId: CURRENT_USER_ID,
                receiverId,
                title: title ?? '',
                content,
                issueDate: new Date().toISOString()
            };

            if (!state.conversations[listingId]) {
                state.conversations[listingId] = [];
            }
            state.conversations[listingId].push(message);
        }
    }
});

export default data_messages.reducer;
export const {sendMessage} = data_messages.actions;

// readMessage() - selector για ανάγνωση μηνυμάτων συνομιλίας
export const selectConversation = (listingId) => (state) =>
    state.data_messages.conversations[listingId] ?? [];

export const CURRENT_USER_ID_CONST = CURRENT_USER_ID;
