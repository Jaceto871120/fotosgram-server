import Server from './classes/server';
import userRoutes from './routes/usuario';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import postRoutes from './routes/post';

const server = new Server();

// Body parser
server.app.use( bodyParser.urlencoded({extended:true}));
server.app.use( bodyParser.json());

// FileUpload

server.app.use(fileUpload());

// Rutas de mi app
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);

// Conectar DB

mongoose.connect('mongodb://localhost:27017/fotosgram',
                {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}, (err) => {
                    if(err) throw err;
                    console.log('Base de datos ONLINE');
                })

// Levantar Express
server.start( () => {
    console.log('Servidor Corriendo en puerto', server.port);
})