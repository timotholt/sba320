# SBA320 - Marvel Character Search

A React application that allows users to search for Marvel characters using the Marvel API.







## Technologies Used

- React 18
- Redux Toolkit for state management
- Vite as the build tool
- Marvel API for character data
- Axios for API requests
- CSS for styling

## Approach

This application follows a simple and clean architecture:
- Redux Toolkit for centralized state management
- Async thunks for API calls
- Responsive grid layout for character cards
- Error handling for failed API requests
- Loading states for better user experience

## Live Site

[Link to be added after deployment to render.com]

## Usage Instructions

1. Enter a character name in the search box
2. Click the search button or press Enter
3. View the results in a grid layout
4. Each character card shows:
   - Character image
   - Name
   - Description (if available)

## Unsolved Problems

- Rate limiting: Marvel API has a limit of 3000 calls per day
- Image optimization could be improved
- Could add pagination for large result sets
