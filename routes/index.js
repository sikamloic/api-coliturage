const express = require('express');
const config = require('../config/config');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const colisRoute = require('./colis.route');
const trajetRoute = require('./trajet.route');
const propostionRoute = require('./proposition.route');
const searchRoute = require('./search.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute
  },
  {
    path: '/user',
    route: userRoute
  },
  {
    path: '/colis',
    route: colisRoute
  },
  {
    path: '/trajet',
    route: trajetRoute
  },
  {
    path: '/proposition',
    route: propostionRoute
  },
  {
    path: '/search',
    route: searchRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
// if (config.env === 'development') {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

module.exports = router;