const userController = require("./controller/user_controller");
userController
  .addUser("pandhu", 17)
  .then((result) => {
    console.log("User updated successfully:", result);
  })
  .catch((err) => {
    console.log("Error adding user:", err);
  });

userController
  .getUser()
  .catch((err) => console.log("Cannot get data users \nError:", err));

userController
  .updateUser("65673792f81fb08fac87fe2b", "asfina", 16)
  .then((result) => {
    console.log("User updated successfully:", result);
  })
  .catch((error) => {
    console.error("Error updating user:", error);
  });
