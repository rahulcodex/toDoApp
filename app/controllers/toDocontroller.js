const response = require ('./../library/responselib')
const check = require ('./../library/checklib')
const logger = require('./../library/loggerlib')
const shortId = require ('shortid')
const  mongoose = require('mongoose')
const toDoModel =  mongoose.model('toDo');
var schedule = require('node-schedule');
const nodeMailer = require('nodemailer');

// start of  createtodolist function
let createToDolist =(req, res)=>{

        if(check.isEmpty(req.body.taskname )) 
        {
           console.log('403  forbidden  request')
           let apiResponse = response.generate(true , `required parameter missing`, 403, null )
           res.send(apiResponse)
        }

        else {
            
    
            let  newList = new toDoModel ({

                    userId: req.params.emailId,
                    taskId :shortId.generate(),
                    task:{
                        taskname: req.body.taskname,
                        List:{
                            listId: shortId.generate(),
                            list:req.body.list
                        }
                    }
                     
                    
    
    })



    console.log(newList)
     newList.save ((err, result )=>{
         if (err)
         {
             logger.error(`${err}`, 'toDocontroller: createToDo', 5)
             let apiResponse = response.generate(true , 'some  error occured ', 400, null)
             res.send(apiResponse)
             console.log(apiResponse)
             
         }

         else {
              console.log(result)
              let apiResponse =  response.generate(false , `data svaed succesfully`, 202, result)
              res.send(apiResponse)
              console.log(apiResponse)
         }
     })

        }
   

}

// end  of  createToDolist   function


//  start of delete task function
let deleteTask = (req, res)=>{

    if(check.isEmpty(req.params.taskId))
    {
        let apiResponse = response.generate(true, 'some error occured', 500, null)
        res.send(apiResponse)
        console.log(apiResponse)

    }

    else {
        toDoModel.deleteOne ({ taskId: req.param.taskId}, (err, result)=>{
            if(err)
            {
                logger.error(`${err}` , `database`, 10)
                let apiResponse = response.generate(true , ` some error occured ${err}`, 404, null)
                res.send(apiResponse)
            }
            else {
                console.log('data deleted succesfully')
                let apiResponse = response.generate(false , 'data deleted succesfully', 200, result)
                res.send(apiResponse)
                console.log(apiResponse)
            }
        })
    }

}

//  end  of delete task function


//    function  to retrieve  list of  particular user
let getallList = (req, res)=>{


    if(check.isEmpty(req.params.userId))
    {
        
        
        let apiResponse = response.generate(true, `required parameter missing`, 404, null)
        console.log(apiResponse)
        res.send(apiResponse)
    }
    else {
        toDoModel.findOne ({ userId: req.params.userId}, (err, result)=>{
            if(err)
            {
                console.log(`${err}`)
                logger.error(`${err}`, database, 10)
                let apiResponse = response.generate(false , `database error ${err}`, 500, null)
                res.send(apiResponse)
            }
            else {
                let apiResponse = response.generate(false , ` data fetched succesfully`, 200, result)
                res.send(apiResponse)
                console.log(apiResponse)
                
            }
        })
    }
}
//  end  of  all list function

let deletealllist =(req, res)=>{
    toDoModel.deleteMany((err, result)=>{
        if(err)
        {
            console.log(err)
            let apiResponse = response.generate(true, `some error occured ${err}`,500, null)
            console.log(apiResponse)
            res.send(apiResponse)
        }
        else {
            let apiResponse = response.generate(false , `data deleted succesfully` , 200, result)
            console.log(result)
            res.send(apiResponse)
        }
    })
}

//  start of email reminder function
let emailReminder =(req, res )=>{

    var j = schedule.scheduleJob('* * * * 0-6',function(){

       
        let transport = nodeMailer.createTransport({
           
            service:'Gmail',
            
           
            auth:{
                user:' rahulparmarshk@gmail.com	',
                pass:' shk1993@26	'

            },

           
        });

        const mailOptions ={
            from:'rahulparmarshk@gmail.com',
            to:req.body.emailto,
            subject:req.body.subject,

           
        }
        transport.sendMail(mailOptions, (err, info)=>{
            if(err)
            {
              
                console.log(err)
            }

            else {
                let apiResponse = response.generate(false , 'reminder sent', 200, info)
                res.send(apiResponse)
               console.log( 'Message Sent :%s',info.messageId)
            }
        })
            
        
        
      });
    
}

// end  of  emailreminder function


module.exports ={
    getallList: getallList,
    deleteList: deleteList,
    deleteTask, deleteTask,
    createToDolist: createToDolist,
    deleteAll:deletealllist,
    emailReminder:emailReminder
}