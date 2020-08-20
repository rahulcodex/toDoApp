    const response = require('./../library/responselib')
    const logger = require('./../library/loggerlib')
    const  passwordCompare = require('./../library/generatePasswordlib')
    const  check = require('./../library/checklib')
    const validate = require('./../library/validation')
    const shortid = require('shortid')
    const mongoose  = require('mongoose')
   



    const userModel = mongoose.model('user');

    

         //  signup function  to create account of  new user
        let signUp =(req, res )=>{

            
                if(check.isEmpty(req.body.email)|| check.isEmpty(req.body.password)|| check.isEmpty(req.body.firstName)|| check.isEmpty(req.body.lastName))
                {
                    let apiResponse = response.generate(true , 'one  or  more field  missing', 403, null)
                    res.send(apiResponse)
                    console.log(apiResponse)
                }
                

                else if(!validate.Email(req.body.email) )
                {
                    let apiResponse = response.generate(true, 'invalid  email ', 404, null)
                    console.log(apiResponse)
                    res.send(apiResponse)
                }
                
                   
                else {
                    //console.log(' all ok ')

                    userModel.findOne({email:req.body.email}, (err, userData)=>{
                        if (err)
                        {
                            console.log(err)
                            let apiResponse = response.generate(true, 'some error occured ', 500, null)
                            console.log(apiResponse)
                            res.send(apiResponse)
                        }

                        else if(!check.isEmpty(userData))
                        {
                            let apiResponse = response.generate(true, 'user   already exist', 200, null)
                              res.send(apiResponse)
                              console.log(apiResponse)
                        }
 

                        else {

                    
                            let newUser = new userModel ({
                                userId: shortid.generate(),
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                email: req.body.email,
                                password: req.body.password
   
                            })

                            console.log(newUser)
   
                           newUser.save((err, result)=>{
                               if (err) {
                                   logger.error(err.message, 'userController:createUser', 5)
                                   let apiResponse = response.generate(true, ' some error occured', 500, null)
                                   res.send(apiResponse)
                               }
       
                               else {
                                   let apiResponse = response.generate(false ,'data saved succesfully', 200, result)
                                   console.log(result)
                                   res.send(apiResponse)
                               }
   
                           })
                        
                    }


                    })

                   

                }


                   


        }
       //  end  of  sigUp  function


    
     //  start of login  function
    let loginFunction = (req, res) => {

        if(req.body.email)
        {
            userModel.findOne({email: req.body.email}, (err, userData)=>{
                if(err)
                {
                    console.log(err)
                    let apiResponse = response.generate(true, 'some eror occured ', 500, null)
                    res.send(apiResponse)
                    console.log(apiResponse)
                }

                else if(!check.isEmpty(userData))
                {
                    passwordCompare.comparePassword(userData.password, req.body.password, (err, isMatch)=>{
                        if(err)
                        {
                            let apiResponse = response.generate(true, 'some error occured', 500, null)
                            console.log(apiResponse)
                            res.send(apiResponse)
                        }
                        else if(isMatch){
                            let apiResponse = response.generate(false , 'login succesfull', 200, isMatch)
                            res.send(apiResponse)
                            console.log(apiResponse)

                        }
                        else {
                            logger.error(`${err}`,  'userController: loginFunction', 5)
                            let apiResponse = response.generate(true, 'invalid password', 400, null)
                            res.send(apiResponse)
                            console.log(apiResponse)
                        }
                    })
                }
            })
        }
    }


   // end  of login  function


      module.exports ={
          signUp: signUp,
          login:loginFunction
      }
