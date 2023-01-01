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
http://localhost:5000/api/orders/order

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
