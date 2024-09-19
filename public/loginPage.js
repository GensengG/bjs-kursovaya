'use strict'

const userForm = new UserForm();
userForm.registerFormCallback = function funcRegister(data){
    ApiConnector.register(data, response => console.log(response));
};

userForm.loginFormCallback = function funcLogin(data){
  ApiConnector.login(data, response => {
    console.log(response.userId);
    if(response){
        location.reload();
    }
    userForm.setLoginErrorMessage();
  });
}
