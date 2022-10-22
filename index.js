import express from 'express'
import mongoose from 'mongoose'
import { registerValidation, loginValidation } from './src/validations/validators.js'
import{checkAuth} from './src/middlwares/auth.js'
import cors from 'cors'
import * as user from './src/routes/user.js';

const app = express()
app.use(express.json())
app.use(cors());
const PORT = 4444


async function start() {
 try {
  await mongoose.connect("mongodb+srv://admin:vlad@cluster0.oilzy.mongodb.net/budget?retryWrites=true&w=majority",
   {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  ).then(() => console.log("success"))

///user
  app.post('/user/register', registerValidation, user.register)
  app.post('/user/login', loginValidation, user.login)
  app.get('/user/me', checkAuth, user.getMe);
  app.put('/user/edit', checkAuth, registerValidation, user.edit)
  app.delete('/user/remove', checkAuth, user.remove)

///budget
  
  app.listen(PORT, () => {
   console.log("server started")
  })
  
 }catch(e){console.log(e);}
}
start()