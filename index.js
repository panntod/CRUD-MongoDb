const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const mongoClient = new MongoClient(uri);

async function get_users() {
  try {
    await mongoClient.connect();

    const users = await mongoClient
      .db("crud_mongo")
      .collection("user")
      .find({})
      .toArray();

    console.log(users);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoClient.close();
  }
}

get_users();
