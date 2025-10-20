## Create user
Through a register page a user should be able to create an valid login credential entry. The password has to fulfill all the requirements from the library password-validator-ap. If not fullfilled the user gets  feedback on how to improve the password strength

## Login user
Through a login page the user can enter their credentials. If the database finds a user entry with the same credentials, the user gets logged in and sent to the feed page.

## User validation
The validation of the user should be done through setting a cookie. 
When a user chooses to enter their credentials and login a cookie should be set which then validates the user on the feed page. If there are no cookie present (which a middleware should check for upon enterering a url) the user should be shuffled to the login page and given a error message explaining why. 

## Creating posts
A logged in user should be able to create posts which other users can see and react to. 

## Deleting posts
A logged in user should be able to delete a post they have created. It should not be possible for a user to delete another users posts.

## Verification
The user, when a sucessfull login occured, should get a cookie set for validation. Which then is used to verify the user and enables them to write posts and like them.