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

Note 4:
Instead of adding customer_name field to Order model
I referenced the User model
And the user model contains the customer name
Otherwise, it would be a redundancy

---

Note 5:
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
PATCH http://localhost:5000/api/orders

{
"order_id":"ENTER_EXISTING_ORDER_ID_HERE",
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
