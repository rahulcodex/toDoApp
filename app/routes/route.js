const express = require('express');
const router = express.Router();
const userController = require('./../controllers/useController')
const toDoController =   require('./../controllers/toDocontroller')
const  appConfig  = require ('./../config/appconfig')


module.exports.setRouter=(app)=>{

    let baseUrl= `${appConfig.apiVersion}/users`;
    
    let baseUrl2 = appConfig.apiVersion + '/toDo';


    
    
    app.post(`${baseUrl}/signup`, userController.signUp);

    app.post(`${baseUrl}/login`, userController.login);


    app.post(`${baseUrl2}/create/:emailId`, toDoController.createToDolist);
    app.get(`${baseUrl2}/getList/:userId`, toDoController.getallList);
    app.post(`${baseUrl2}/sendreminder`, toDoController.emailReminder)
    app.put(`${baseUrl2}/deletetask/:taskId`, toDoController.deleteTask)
    app.post(`${baseUrl2}/deleteall`, toDoController.deleteAll)
   








}