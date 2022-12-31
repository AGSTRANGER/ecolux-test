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
