import express, { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import ErrorMiddleware from '@/middleware/error.middleware';
import 'dotenv/config';
import { userRoute } from './routes/index';

class App {
    app: Application = express();
    port: any = process.env.PORT;

    initialiseMiddleware() {
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(compression());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    initialiseControllers() {
        this.app.use('/users', userRoute);
    }

    initialiseErrorHandling() {
        this.app.use(ErrorMiddleware);
    }

    initialiseDatabaseConnection() {
        const { connect } = mongoose;
        connect(`${process.env.DATABASE_CONNECTION}`, {});
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening to port ${this.port}`);
        });
    }
}

export default App;
