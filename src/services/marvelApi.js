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
  
  const params = {
    ...getAuthParams(),
    limit: 20,  // Getting 20 characters at a time
    ...(nameStartsWith && { nameStartsWith }),
  };

  // console.log('Final params:', params) // Checking if params look right
  // console.log('About to make API call...')

  try {
    // console.log('Calling Marvel API...') // More breadcrumbs
    const response = await axios.get(`${BASE_URL}/characters`, { params });
    // console.log('WE GOT DATA!', response.data)
    return response.data.data.results;
  } catch (error) {
    // console.log('OH NO OH NO OH NO') // It broke
    // console.log('Error details:', error) // Actually useful debug info
    console.error('Error fetching Marvel characters:', error);
    throw error;
  }
};
