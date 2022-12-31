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
