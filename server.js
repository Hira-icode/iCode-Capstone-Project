const express = require("express");
const cors = require("cors");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

const PORT = 3001;
const URL_MONGODB = "mongodb://localhost:27017";
const app = express();
const DB_NAME = "hira_website";
const COLLECTIONS_NAMES = {
  contactUsForm: "contact_us_forms",
  customerFeedbackForm: "fb_forms",
};
app.use(cors());

app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(express.static(path.join(__dirname, "client"))); // using static files

// Access the parse results as request.body
app.post("/api/contactus", (req, res) => {
  try {
    MongoClient.connect(
      URL_MONGODB,
      { useUnifiedTopology: true },
      async (err, client) => {
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTIONS_NAMES.contactUsForm);

        const result = await collection.insertOne(req.body);
        console.log(
          `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
        );
        client.close();
        res.json({ message: "done success" }).status(201);
      }
    );
  } catch (error) {
    const error_msg = `Error inserting form data into collection`;
    console.log(error_msg);
    res.send(error_msg).status(500);
  }
});

app.get("/api/CustomerFeedback", (req, res) => {
  try {
    MongoClient.connect(
      URL_MONGODB,
      { useUnifiedTopology: true },
      (err, client) => {
        const db = client.db(DB_NAME);
        const collection = db.collection(
          COLLECTIONS_NAMES.customerFeedbackForm
        );

        collection
          .find()
          .limit(4)
          .toArray((err, result) => {
            if (err) throw err;
            client.close();
            res.json(result).status(200);
          });
      }
    );
  } catch (error) {
    const error_msg = `Error getting data from collection`;
    console.log(error_msg);
    res.send(error_msg).status(500);
  }
});

app.post("/api/CustomerFeedback", (req, res) => {
  try {
    console.log("here", req.body);

    MongoClient.connect(
      URL_MONGODB,
      { useUnifiedTopology: true },
      async (err, client) => {
        const db = client.db(DB_NAME);
        const collection = db.collection(
          COLLECTIONS_NAMES.customerFeedbackForm
        );

        const result = await collection.insertOne(req.body);
        console.log(
          `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`
        );
        client.close();
        res.json({ message: "done success" }).status(201);
      }
    );
  } catch (error) {
    const error_msg = `Error inserting form data into collection`;
    console.log(error_msg);
    res.send(error_msg).status(500);
  }
});

// this has to be always the last line of code
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
