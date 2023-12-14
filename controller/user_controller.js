const User = require("../models/user_model");

exports.getUser = async () => {
  try {
    const users = await User.find({});
    console.log(users);
    return users;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  } 
};

exports.addUser = async (name, age, address, email) => {
  try {
    const newUser = new User({ name, age, address, email });
    const insertedUser = await newUser.save();
    return insertedUser;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  } 
};

exports.updateUser = async (id, name, age, address, email) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, age, address, email },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

exports.deleteUser = async (id) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      console.log("User not found or already deleted");
    } else{
      console.log("Success Deleted User");
    }

    return deletedUser;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  } 
};
