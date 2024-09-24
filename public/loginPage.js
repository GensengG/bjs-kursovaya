'use strict'

const userForm = new UserForm();
userForm.registerFormCallback = data => {
    ApiConnector.register(data, response => {
      let resultId = response.userId;
      if(resultId > 0){
          location.reload();
      } else {
      userForm.setLoginErrorMessage(response.error);
      }
    });
};

userForm.loginFormCallback = data => {
  ApiConnector.login(data, response => {
    let resultId = response.userId;
    if(resultId > 0){
        location.reload();
    } else {
        userForm.setLoginErrorMessage(response.error);
    }
  });
}
