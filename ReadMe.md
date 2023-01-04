List of orders API endpoints:

1. The POST /api/orders endpoint is for creating a new order. It authenticates the request using the normal-request-authentication-strategy, and then creates an order with the user's ID, shipping address, and items from the request body.

2. The GET /api/orders endpoint is for getting a list of orders. It authenticates the request and then gets a list of orders for the authenticated user.

3. The GET /api/orders/:order_id endpoint is for getting a specific order by its ID. It authenticates the request, and then gets the order with the specified ID. It also checks if the authenticated user is the owner of the order before returning it.

4. The PATCH /api/orders/:order_id endpoint is for updating an order by its ID. It authenticates the request and then updates the order with the specified ID. It also checks if the authenticated user is the owner of the order before updating it.

5. The DELETE /api/orders/:order_id endpoint is for deleting an order by its ID. It authenticates the request and then deletes the order with the specified ID. It also checks if the authenticated user is the owner of the order before deleting it.

List of users API endpoints:

1. The POST /api/orders endpoint is for creating a new order. It authenticates the request using the normal-request-authentication-strategy, and then creates an order with the user's ID, shipping address, and items from the request body.

---

List of users API endpoints:

1. The POST /api/users endpoint is for signing up a new user. It receives an email and password in the request body, and then creates a new user with these fields using the signupUser service. If the sign up was successful, it returns a status of 200 and a message. If it was unsuccessful, it returns a status of 500 and a message.

The signupUser service creates a new user with the provided email and password and saves it to the database. It uses the genSalt and genHash helpers from the userServicesHelpers module to generate a salt and hash the password before saving it.

2. The POST /api/users/signin endpoint is for signing in an existing user. It receives an email and password in the request body, and then uses the signinUser service to sign in the user. If the sign in was successful, it returns a status of 200 and a sign in token. If it was unsuccessful, it returns a status of 500 and a message.

The signinUser service tries to find a user with the provided email, and then verifies the password using the verifyPassword helper from the userServicesHelpers module. If the password is correct, it returns a sign in token. If the password is incorrect or the user doesn't exist, it throws an error.

---

#NOTE 1:
Make sure you have nodemon installed because the start script uses it:
"start": "nodemon server.js"
Otherwise, you can just use
node server.js

---

#NOTE 2:
Create a .env file that contains these values:
MONGO_URI=mongodb://localhost:27017/ecommerce
AUTH_SECRET=Xxxxxxxxxxxxxxx

Make sure to generate a random complex AUTH_SECRET key.

---

#NOTE 3:
Use this command
npm run seed
To seed the database before testing the app

Keep in mind that whenever you run this command, the database will be reinitialized. I.e: All previous entries will be deleted.

---

#Note 4:
Instead of adding customer_name field to Order model
I referenced the User model
And the user model contains the customer name
Otherwise, it would be a redundancy

---

#Note 5:
This is how you can test creating an order
POST http://localhost:5000/api/orders

body :
{
"shipping_address": "23 Rue du Merle",
"items": [
{
"_id": "63b150aa968793f921fd60c4",
"quantity": 5
}
]
}

You will receive this in the result:
{
"message": "Order creation was successful",
"result": {
"created_order": {
"shipping_address": "23 Rue du Merle",
"order_total": 10,
"items": [
{
"product": "63b150aa968793f921fd60c4",
"price": 10,
"quantity": 5,
"_id": "63b155533f417ce3e9a71aca"
}
],
"state": "unpaid",
"\_id": "63b155533f417ce3e9a71ac9",
"createdAt": "2023-01-01T09:41:39.456Z",
"updatedAt": "2023-01-01T09:41:39.456Z",
"\_\_v": 0
}
}
}

---

Note 5:
This is how you can test updating an order
PATCH http://localhost:5000/api/orders/:ENTER_EXISTING_ORDER_ID_HERE

{
"shipping_address": "ENTER_NEW_SHIPPING_ADDRESS_HERE",
"items": [
{
"_id":"ENTER_EXISTING_ITEM_IN_ORDER_HERE",
"quantity":12
},
{
"_id":"ENTER_NEW_PRODUCT_ID_HERE",
"quantity":6
}
]
}

The will return:

{
"message": "Order update was successful",
"result": {
"updated_order": {
"\_id": "63b16ea23169dbd1a286f738",
"user": "63b16e7baf15195022e5fbd9",
"shipping_address": "NEW_SHIPPING_ADDRESS",
"order_total": 10,
"items": [
{
"product": "UPDATED_EXISTING_ITEM",
"price": 10,
"quantity": 12 // New quantity
},
{
"product": "ADDED_NEW_ITEM_TO_ORDER",
"price": 30,
"quantity": 6
}
],
"state": "unpaid",
"createdAt": "2023-01-01T11:29:38.932Z",
"updatedAt": "2023-01-01T11:36:34.700Z",
"\_\_v": 1
}
}
}

---

Note 6:
When installing the frontend modules, you may get an error because
react-redux is not yet compatible with the latest version of React

So when you install react-redux, use this flag
--legacy-peer-deps

---

Note 7:
To run the frontend, use this command:
cd client && npm start

---

/test-images/Screenshot 1 - Sign up successful.png
Screenshots:

![Sign-up page](/test-images/signup.png)
