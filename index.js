const readline = require("readline");
const userController = require("./controller/user_controller");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function executeCommand(command) {
  switch (command) {
    case "addUser":
      rl.question("Enter name: ", (name) => {
        rl.question("Enter age: ", (age) => {
          userController
            .addUser(name, parseInt(age))
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
      break;

    case "getUser":
      userController
        .getUser()
        .catch((err) => console.log("Cannot get data users \nError:", err))
        .finally(() => rl.close());
      break;

    case "updateUser":
      getUserAndUpdate();
      break;

    case "deleteUser":
      userController
        .deleteUser("65673792f81fb08fac87fe2b")
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
      break;
    default:
      console.log("Invalid command");
      rl.close();
  }
}

async function getUserAndUpdate() {
  try {
    await userController.getUser();
    rl.question("Enter Object Id: ", (id) => {
      rl.question("Enter Name: ", (name) => {
        rl.question("Enter Age: ", (age) => {
          userController
            .updateUser(id, name, parseInt(age))
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
  } catch (error) {
    console.error("Error getting user:", error);
    rl.close();
  }
}

rl.question(
  "Enter command (addUser, getUser, updateUser, deleteUser): ",
  (command) => {
    executeCommand(command);
  }
);
