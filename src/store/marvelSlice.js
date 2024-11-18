// Import necessary functions from Redux Toolkit
// createSlice: helps make Redux actions and reducers
// createAsyncThunk: handles async operations like API calls
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCharacters } from '../services/marvelApi';

// Debug logs I used when stuff wasn't working
// console.log('Why isn't my state updating??')  // Forgot to export the action

/**
 * createAsyncThunk creates a special action that can handle three states:
 * pending (loading), fulfilled (success), and rejected (error)
 * 
 * Think of it like ordering pizza:
 * pending = waiting for delivery
 * fulfilled = pizza arrives!
 * rejected = they lost your order 😢
 */
export const searchCharacters = createAsyncThunk(
  'marvel/searchCharacters',  // This is like the action's name tag
  async (searchTerm) => {
    // console.log('Searching for:', searchTerm)  // Was using this to check if search term was right
    // console.log('Please work please work please work')  // It worked!
    const characters = await fetchCharacters(searchTerm);
    // console.log('API response:', characters)  // Used this to check the data structure
    return characters;
  }
);

/**
 * This is our main slice! It's like a piece of the Redux pie
 * It handles all the Marvel character related state in our app
 */
const marvelSlice = createSlice({
  name: 'marvel',
  // Initial state is like setting up your room before a party
  initialState: {
    characters: [],      // Empty array to store our Marvel heroes
    status: 'idle',      // Could be: 'idle', 'loading', 'succeeded', 'failed'
    error: null,         // Holds any error messages if something goes wrong
  },
  // Regular reducers go here, but we're not using any
  // We only need ones for handling our async action
  reducers: {},
  
  // This is where the magic happens!
  // extraReducers handles the different states of our async action
  extraReducers: (builder) => {
    builder
      // When we start searching...
      .addCase(searchCharacters.pending, (state) => {
        state.status = 'loading';
        // console.log('Loading state activated!')  // Used this when loading spinner wasn't showing
        // console.log('State in pending:', state)  // Checking if state updates correctly
      })
      // When we successfully get our characters...
      .addCase(searchCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.characters = action.payload;
        // console.log('SUCCESS! Got the characters:', action.payload)  // Best console.log ever
        // console.log('Is my state updating correctly?', state)  // It was!
      })
      // If something goes wrong...
      .addCase(searchCharacters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        // console.log('EVERYTHING IS BROKEN')  // It wasn't actually broken
        // console.log('Error:', action.error.message)  // This helped find the actual problem
        // console.log('Current state:', state)  // State was updating correctly, API key was wrong
      });
  },
});

// Export the reducer to use in our store
// Think of this like packing up your slice of pie to take home
export default marvelSlice.reducer;

// More debug logs I tried
// console.log('End of file reached')  // Basic debugging 101
// console.log('If you see this, file is loading')  // It was loading fine
// console.log('I should probably remove all these console.logs') // Yes, yes I should
