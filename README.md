- **User Management**: This server provides APIs to create, read, update, and delete user accounts.

- **Business Card Creation**: It also offers endpoints to create, view, and manage digital business cards.

## Authentication

All requests to this server must include an `x-auth-token` header for authentication. Ensure that you provide a valid token in the header of your requests.

## Dependencies

This server relies on several npm packages and dependencies. Here's a list of the main packages used:

- `bcryptjs`: For password hashing and security.
- `config`: For configuration management.
- `cors`: For handling Cross-Origin Resource Sharing.
- `express`: For building the server and defining routes.
- `joi`: For request data validation.
- `jsonwebtoken`: For authentication using JSON Web Tokens (JWT).
- `lodash`: For utility functions.
- `mongoose`: For interacting with MongoDB.
- `morgan`: For HTTP request logging.
- `chalk`: For colored console logs.
- `nodemon`: For automatic server restart during development.
- `logger`: For custom logging of server events.

You can install these dependencies using `npm install`.

## Endpoints

### User Endpoints

1. **Register User**

   - **Description**: Create a new user account.
   - **Method**: POST
   - **Route**: `/users`
   - **Authentication**: Not required
   - **Usage**: Anyone can register a new user.

2. **Encrypt Token**

   - **Description**: Encrypt the authentication token.
   - **Method**: POST
   - **Route**: `/users/login`
   - **Authentication**: Not required
   - **Usage**: This endpoint handles the encryption of authentication tokens for added security.

3. **Get All Users**

   - **Description**: Retrieve an array of all users.
   - **Method**: GET
   - **Route**: `/users`
   - **Authentication**: Requires admin privileges
   - **Usage**: Admins can view all users.

4. **Get User**

   - **Description**: Get user details by ID.
   - **Method**: GET
   - **Route**: `/users/:id`
   - **Authentication**: Requires the registered user or admin privileges
   - **Usage**: Registered users can view their own details, and admins can view any user's details.

5. **Edit User**

   - **Description**: Edit user information.
   - **Method**: PUT
   - **Route**: `/users/:id`
   - **Authentication**: Requires the registered user
   - **Usage**: Registered users can edit their own information.

6. **Change isBusiness Status**

   - **Description**: Change the isBusiness status of a user.
   - **Method**: PATCH
   - **Route**: `/users/:id`
   - **Authentication**: Requires the registered user
   - **Usage**: Registered users can change their isBusiness status.

7. **Delete User**

   - **Description**: Delete a user account.
   - **Method**: DELETE
   - **Route**: `/users/:id`
   - **Authentication**: Requires the registered user or admin privileges
   - **Usage**: Registered users can delete their own account, and admins can delete any user account.

- ### Business Card Endpoints

1. **All Cards**

   - **Description**: Retrieve all business cards.
   - **Method**: GET
   - **Route**: `/cards`
   - **Authentication**: Not required
   - **Usage**: Anyone can view all business cards.

2. **Array of Cards (User's Cards)**

   - **Description**: Get the cards of the registered user.
   - **Method**: GET
   - **Route**: `/cards/my-cards`
   - **Authentication**: Requires the registered user
   - **Usage**: Registered users can view their own business cards.

3. **Get Card**

   - **Description**: Get card details by ID.
   - **Method**: GET
   - **Route**: `/cards/:id`
   - **Authentication**: Not required
   - **Usage**: Anyone can view a specific business card.

4. **Create New Card**

   - **Description**: Create a new business card.
   - **Method**: POST
   - **Route**: `/cards`
   - **Authentication**: Requires business user privileges
   - **Usage**: Business users can create new business cards.

5. **Edit Card**

   - **Description**: Edit a business card.
   - **Method**: PUT
   - **Route**: `/cards/:id`
   - **Authentication**: Requires the user who created the card
   - **Usage**: Users who created a card can edit it.

6. **Like Card**

   - **Description**: Like a business card.
   - **Method**: PATCH
   - **Route**: `/cards/:id`
   - **Authentication**: Requires a registered user
   - **Usage**: Registered users can like a business card.

7. **Delete Card**

   - **Description**: Delete a business card.
   - **Method**: DELETE
   - **Route**: `/cards/:id`
   - **Authentication**: Requires the user who created the card or admin privileges
   - **Usage**: Users who created a card can delete it, and admins can delete any business card.
