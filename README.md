# Marvel Character Search

A React application that allows users to search for Marvel characters using the Marvel API.

## Project Requirements

| Requirement | Status |
| :--- | :---: |
| Built with HTML, CSS, JavaScript, REACT, and Redux Toolkit | ✅ |
| Hosted on Heroku or Netlify | ✅ |
| Frequent commits to GitHub | ✅ |
| **README.md Content:** | |
| Explanations of technologies used | ✅ |
| Explanations of approach taken | ✅ |
| Link to live site: https://tim-otholt-sba320.netlify.app/ | ✅ |
| Usage instructions | ✅ |
| Unsolved problems | ✅ |

## Technologies Used

| Category | Technologies |
| :--- | :--- |
| Frontend Framework | React 18 |
| State Management | Redux Toolkit |
| Build Tool | Vite |
| API Integration | Marvel API, Axios |
| Security | CryptoJS (MD5 hashing) |
| Styling | CSS with Glassmorphism |

## API Authentication

The Marvel API requires a specific authentication process for each request. See the [official Marvel API documentation](https://developer.marvel.com/documentation/authorization) for full details.

1. **Required Parameters:**
   - Timestamp (ts)
   - Public API Key
   - Hash (md5 digest)

2. **Hash Generation:**
   ```javascript
   hash = md5(timestamp + privateKey + publicKey)
   ```

3. **Security Measures:**
   - API keys stored in environment variables
   - Each request includes a unique timestamp
   - Hash verification prevents unauthorized API usage

## Approach

This application follows a modern architecture with these key features:

| Feature | Description |
| :--- | :--- |
| State Management | Centralized using Redux Toolkit |
| API Integration | Async thunks for efficient data fetching |
| UI Design | Responsive grid with glassmorphism effects |
| Error Handling | Comprehensive API error management |
| User Experience | Loading states and smooth animations |
| Background | Dynamic animated gradient with floating elements |

## Live Site

https://tim-otholt-sba320.netlify.app/

## Usage Instructions

1. Enter a character name in the search box
2. Click the search button or press Enter
3. View the results in a grid layout
4. Each character card shows:
   - Character image
   - Name
   - Description (if available)

## Unsolved Problems

| Issue | Description |
| :--- | :--- |
| Rate Limiting | Marvel API has a limit of 3000 calls per day |
| Pagination | Need to add for large result sets |
