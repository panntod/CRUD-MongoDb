const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const mongoClient = new MongoClient(uri);

exports.getUser = async () => {
  try {
    await mongoClient.connect();

    const get_users = await mongoClient
      .db("crud_mongo")
      .collection("user")
      .find({})
      .toArray();

    console.log(get_users);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoClient.close();
  }
};

exports.addUser = async (name, age) => {
  try {
    await mongoClient.connect();

    const insert_user = await mongoClient
      .db("crud_mongo")
      .collection("user")
      .insertOne({ name, age });

    return (insert_user);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoClient.close();
  }
};

