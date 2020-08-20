const mongoose = require ('mongoose')
  schema = mongoose.Schema


  let toDoSchema = new schema ({
      userId :{
         type : String, 
         default: '',
         
      },

      taskId:{
          type: String,
          default: ''
      },

     

      task:{
          
         taskname:{
           type: String
         },
        List:{
          listId:
          {
           type: String
          },
          list:{
             type : String
          }
          
        }
        
    }

     

      

     
  })

mongoose.model('toDo' , toDoSchema)