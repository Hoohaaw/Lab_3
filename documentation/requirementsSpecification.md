# Requirements Specification

## User Registration

Through a register page, a user should be able to create valid login credentials. The password must fulfill all requirements from the library password-validator-ap (11 validation rules).

The user should receive real-time feedback as they type their password, with a visual checklist showing:
- Which password requirements are met (displayed with green checkmark)
- Which requirements are not met (displayed with red X)
- A counter showing how many of the 11 requirements are currently fulfilled (e.g., "7 / 11 requirements met")

The registration button should be disabled until all password requirements are met. If registration fails, the user should receive clear feedback on which requirements are not fulfilled or if the username already exists.

Upon successful registration, the user should be redirected to the login page with a success message.

## User Login

Through a login page, the user can enter their credentials. If the database finds a user entry matching the provided username and password, the user gets logged in and redirected to the feed page.

If the credentials are invalid, the user should receive an error message indicating that the username or password is incorrect.

## User Authentication & Authorization

The validation of the user should be done through JWT (JSON Web Token) stored in an HTTP-only cookie.

When a user logs in, the system should:
- Generate a JWT token containing the user's ID
- Set the token to expire after 2 days
- Store the token in a secure, HTTP-only cookie named "authToken"
- Store the username in a separate cookie for display purposes

When accessing protected routes (feed, post creation, liking posts), middleware should:
- Check for the presence of a valid authentication token
- Verify the token is valid and not expired
- Redirect unauthenticated users to the login page
- Allow authenticated users to proceed

## Prevent Duplicate Sessions

If a user is already logged in (has a valid authentication cookie), they should be automatically redirected to the feed page when attempting to access the login or register pages. This prevents confusion and duplicate login attempts.

## User Logout

A logged in user should be able to logout through a logout button in the header. When logging out, the system should:
- Clear all authentication cookies (both authToken and username)
- Redirect the user to the login page

After logout, the user should not be able to access protected pages without logging in again.

## Creating Posts

A logged in user should be able to create posts through a text input field on the feed page.

Post requirements:
- Maximum length of 280 characters
- Cannot be empty or contain only whitespace
- Input field should prevent users from exceeding the character limit

When a post is created:
- It should be saved to the database with the author's user ID and username
- It should immediately appear at the top of the feed
- The timestamp of creation should be recorded

## Post Display

The feed page should display all posts from the last 48 hours, sorted by creation time (newest first).

Each post should display:
- The username of the author who created it
- The timestamp of when the post was created (formatted in a human-readable way)
- The post content
- The number of likes the post has received
- A like button to interact with the post

## Time-Limited Post Visibility

Posts should only be visible for 48 hours after creation. The system should automatically filter out posts older than 48 hours when displaying the feed. This creates a temporary, ephemeral social media experience.

The filtering should happen server-side when fetching posts from the database.

## Liking Posts

A logged in user should be able to like posts by clicking a like button on each post.

Like functionality:
- Each post displays the total number of likes it has received
- When a user likes a post, the like count should increment by 1
- The updated like count should be displayed immediately
- Users can like any post, including their own
- Users can like the same post multiple times (no restriction implemented)

## Header Navigation

When logged in, users should see a header at the top of the feed page containing:
- The logged-in username (displayed as "Logged in as, [username]")
- A logout button to end the session

The header should be sticky and remain visible when scrolling through the feed.