const express = require('express');
const config = require('./config/config')
const sequelize = require('./config/sequilize');
const routes = require('./routes');
const logger = require('./config/logger');
const morgan = require('./config/morgan');
const { errorConverter, errorHandler } = require('./middlewares/error');
const { jwtStrategy } = require('./config/passport');
const passport = require('passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.options('*', cors());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(morgan.errorHandler);

app.use(morgan.successHandler);

app.use(express.json());

app.use(passport.initialize());

passport.use('jwt', jwtStrategy);

if (config.env === 'production') {
    app.use('/auth', authLimiter);
}

// app.use((req, res, next) => {
//     next(new apiError(httpStatus.NOT_FOUND, 'Not found'));
// });

app.use(errorConverter);
app.use(errorHandler)


sequelize.sync({ force: false })
.then(() => {
    logger.info('Connexion à la base de donnée réussie');
})
.catch(err => {
    console.error('Impossible de se connecter à la base de donnée:', err);
});

app.use('/', routes);

app.get('/', (req, res) => {
  res.json({message: "Bienvenue sur l'API de COLITURAGE"})
})

app.listen(config.port, () => {
    logger.info(`Le serveur tourne sur le port ${config.port}`);
});