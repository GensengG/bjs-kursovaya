'use strict'

const userForm = new UserForm();
userForm.registerFormCallback = data => {
    ApiConnector.register(data, response => {
      if(response.userId){
          location.reload();
      } else {
      userForm.setLoginErrorMessage(response.error);
      }
    });
};

userForm.loginFormCallback = data => {
  ApiConnector.login(data, response => {
    if(response.userId){
        location.reload();
    } else {
        userForm.setLoginErrorMessage(response.error);
    }
  });
}
