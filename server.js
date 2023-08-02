import 'express-async-errors'
import express from 'express'
import notfound from './middleware/notfound.js'
import errormiddleware from './middleware/errormiddleware.js'
import dotenv from 'dotenv'
import connectdb from './db/connect.js'
import authrouter from './routes/authrouter.js'
import jobrouter from './routes/jobrouter.js'
import authmiddleware from './middleware/auth.js'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';





dotenv.config()
const port=process.env.ort||6000
const app =express()
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(express.json())


// only when ready to deploy
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());


app.use('/api/v1/auth',authrouter)
app.use('/api/v1/jobs',authmiddleware,jobrouter)
app.get('*',(req,res)=>{res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));})

app.use(errormiddleware)



app.use(notfound)



const start=async()=>{
    try {
    await connectdb(process.env.connection_string)
    app.listen(port,()=>console.log('hello started the server', port))

        
    } catch (error) {
        console.log(error);
        
    }
    

}

start()
