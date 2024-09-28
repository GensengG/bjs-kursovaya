// Выход из личного кабинета
const logout = new LogoutButton();
logout.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        } 
    });
}

// Получение информации о пользователе

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    } 
})

// Получение текущих курсов валюты

const ratesBoard = new RatesBoard();
function getCourses(){
    ApiConnector.getStocks(response => {
        if(response.success){
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
            }
        }
    )
}
getCourses();
setInterval(getCourses,60000);

// Операции с деньгами

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, response => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Поздравляем! Вы стали богаче)");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Поздравляем! Вы произвели обмен одной денежки на другую");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, response => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Успешно! Поздравляем того, кому Вы перевели деньги!");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}

// Работа с избранным

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    if(response.success){
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    } 
});

favoritesWidget.addUserCallback = ({ id, name }) => {
    ApiConnector.addUserToFavorites({ id, name }, response => {
        if(response.success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Здорово, теперь у Вас на одного друга больше!");
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    })
};

favoritesWidget.removeUserCallback = (id) => {
    ApiConnector.removeUserFromFavorites(id, response => {
        if(response.success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Ну и правильно, значит этот человек больше не нужен Вам в списке друзей");
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    })
}
