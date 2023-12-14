const readline = require("readline");
const userController = require("./controller/user_controller");
const { connectDB } = require("./config/connection");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function executeCommand(command) {
  switch (command) {
    case "addUser":
      addNewUser();
      break;

    case "getUser":
      userController
        .getUser()
        .then(() => rl.close())
        .catch((err) => {
          console.log("Cannot get data users \nError:", err);
          rl.close();
        });
      break;

    case "updateUser":
      getUserAndUpdate();
      break;

    case "deleteUser":
      getUserAndDelete();
      break;

    default:
      console.log("Invalid command");
      rl.close();
  }
}

function addNewUser() {
  rl.question("Enter name: ", (name) => {
    rl.question("Enter age: ", (age) => {
      rl.question("Enter address: ", (address) => {
        rl.question("Enter email: ", (email) => {
          userController
            .addUser(name, parseInt(age), address, email)
            .then((result) => {
              console.log("User added successfully:", result);
              rl.close();
            })
            .catch((err) => {
              console.log("Error adding user:", err);
              rl.close();
            });
        });
      });
    });
  });
}

async function getUserAndDelete() {
  try {
    await userController.getUser();
    rl.question("Enter Object id:", (id) => {
      userController
        .deleteUser(id)
        .then((result) => {
          if (result.deletedCount === 1) {
            console.log("User deleted successfully");
          } else {
            console.log("User not found or already deleted");
          }
          rl.close();
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          rl.close();
        });
    });
  } catch (error) {
    console.error("Error getting user:", error);
    rl.close();
  }
}

async function getUserAndUpdate() {
  try {
    await userController.getUser();
    rl.question("Enter Object Id: ", (id) => {
      rl.question("Enter Name: ", (name) => {
        rl.question("Enter Age: ", (age) => {
          rl.question("Enter Address: ", (address) => {
            rl.question("Enter Email: ", (email) => {
              userController
                .updateUser(id, name, parseInt(age), address, email)
                .then((result) => {
                  console.log("User updated successfully:", result);
                  rl.close();
                })
                .catch((error) => {
                  console.error("Error updating user:", error);
                  rl.close();
                });
            });
          });
        });
      });
    });
  } catch (error) {
    console.error("Error getting user:", error);
    rl.close();
  }
}

connectDB()
  .then(() => {
    rl.question(
      "Enter command (addUser, getUser, updateUser, deleteUser): ",
      (command) => {
        executeCommand(command);
      }
    );
  })
  .catch((err) => {
    console.log(err.message);
  });
