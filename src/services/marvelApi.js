import axios from 'axios';  
import CryptoJS from 'crypto-js';

// Get our super secret API keys from environment variables
// (Had to google how to use environment variables in Vite)
const PUBLIC_KEY = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
const PRIVATE_KEY = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
const BASE_URL = 'https://gateway.marvel.com/v1/public';

// console.log('API Keys loaded:', PUBLIC_KEY, PRIVATE_KEY) // NEVER commit this! Almost exposed my keys 😱
// console.log('Is the URL right?', BASE_URL) // It was, I'm just paranoid

/**
 * Marvel API needs a special hash for security
 * It's like making a secret handshake with the API
 * hash = md5(timestamp + private_key + public_key)
 */
const generateHash = (timestamp) => {
  // console.log('Timestamp:', timestamp) // Making sure timestamp was correct
  // console.log('Making hash...') // Debug life
  return CryptoJS.MD5(timestamp + PRIVATE_KEY + PUBLIC_KEY).toString();
};

/**
 * Gets all the authentication stuff ready for the API
 * Marvel needs three things:
 * 1. Timestamp
 * 2. API key
 * 3. Hash of timestamp + keys
 */
const getAuthParams = () => {
  const timestamp = new Date().getTime().toString();
  // console.log('New timestamp created:', timestamp) // Timestamp looked weird but it worked
  // console.log('About to generate hash...') // More debugging breadcrumbs
  return {
    ts: timestamp,
    apikey: PUBLIC_KEY,
    hash: generateHash(timestamp),
  };
};

/**
 * The main function that gets our Marvel characters!
 * @param {string} nameStartsWith - What to search for (like "Spider" or "Iron")
 * @returns {Promise} - Returns promise with character data
 */
export const fetchCharacters = async (nameStartsWith = '') => {
  // console.log('Starting search for:', nameStartsWith) // Basic debug
  // console.log('Please work please work') // Late night debugging be like

  // Check for API keys first
  if (!PUBLIC_KEY || !PRIVATE_KEY) {
    throw new Error('Missing Marvel API keys');
  }
  
  const params = {
    ...getAuthParams(),
    limit: 20,
    ...(nameStartsWith && { nameStartsWith }),
  };

  // console.log('Final params:', params) // Checking if params look right
  // console.log('About to make API call...')

  try {
    // console.log('Calling Marvel API...') // More breadcrumbs
    const response = await axios.get(`${BASE_URL}/characters`, { params });
    // console.log('WE GOT DATA!', response.data)

    // Make sure we got valid data
    if (!response.data?.data?.results) {
      throw new Error('Unexpected data format');
    }

    // No results? Let the user know
    if (response.data.data.results.length === 0) {
      throw new Error(`No Marvel heroes found matching "${nameStartsWith}"`);
    }

    return response.data.data.results;
  } catch (error) {
    // console.log('OH NO OH NO OH NO') // It broke
    // console.log('Error details:', error) // Actually useful debug info
    console.error('Error fetching Marvel characters:', error);

    // Handle different types of errors
    if (error.response) {
      // Server responded with an error status
      const status = error.response.status;
      switch (status) {
        case 401:
          throw new Error('Authentication failed!');
        case 403:
          throw new Error('Access denied - invalid API key!');
        default:
          throw new Error(error.response.data.message || 'Something went wrong with the Marvel API');
      }
    } else if (error.request) {
      // Request made but no response received
      throw new Error('Cannot reach Marvel servers');
    }
    
    // If it's our own error message, keep it
    if (error.message) {
      throw error;
    }
    
    // Fallback error
    throw new Error('Something went wrong');
  }
};
