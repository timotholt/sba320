// Import necessary functions from Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCharacters } from '../services/marvelApi';

// console.log('Why isn't my state updating??')

/**
 * createAsyncThunk creates a special action that can handle three states:
 * pending (loading), fulfilled (success), and rejected (error)
 * 
 * https://redux-toolkit.js.org/api/createAsyncThunk
 */
export const searchCharacters = createAsyncThunk(
  'marvel/searchCharacters',  // This is like the action's name tag
  async (searchTerm, { rejectWithValue }) => {
    // console.log('Searching for:', searchTerm)  // Was using this to check if search term was right
    // console.log('Please work please work please work')  // It worked!
    try {
      const characters = await fetchCharacters(searchTerm);
      // console.log('API response:', characters)  // Used this to check the data structure
      return characters;
    } catch (error) {
      // Send the error message to our reducer
      return rejectWithValue(error.message);
    }
  }
);

/**
 * It holds all our Marvel character data and loading states
 */
const marvelSlice = createSlice({
  name: 'marvel',
  // Initial state is like setting up your room before a party
  initialState: {
    characters: [],      // Empty array to store our Marvel heroes
    status: 'idle',      // Could be: 'idle', 'loading', 'succeeded', 'failed'
    error: null,         // Holds any error messages if something goes wrong
  },
  // Regular reducers for clearing errors
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.status = 'idle';
    }
  },
  
  // This is where the magic happens!
  // extraReducers handles the different states of our async action
  extraReducers: (builder) => {
    builder
      // When we start searching...
      .addCase(searchCharacters.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.characters = [];  // Clear old results while loading
        // console.log('Loading state activated!')  // Used this when loading spinner wasn't showing
        // console.log('State in pending:', state)  // Checking if state updates correctly
      })
      // When we successfully get our characters...
      .addCase(searchCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.characters = action.payload;
        state.error = null;
        // console.log('SUCCESS! Got the characters:', action.payload)  // Best console.log ever
        // console.log('Is my state updating correctly?', state)  // It was!
      })
      // If something goes wrong...
      .addCase(searchCharacters.rejected, (state, action) => {
        state.status = 'failed';
        state.characters = [];  // Clear any partial results
        state.error = action.payload || 'Something went wrong searching for heroes';
        // console.log('EVERYTHING IS BROKEN')
        // console.log('Error:', action.error.message)
        // console.log('Current state:', state)
      });
  },
});

// Export our error clearing action
export const { clearError } = marvelSlice.actions;

// Export the reducer to use in our store
// Think of this like packing up your slice of pie to take home
export default marvelSlice.reducer;

// console.log('End of file reached')
