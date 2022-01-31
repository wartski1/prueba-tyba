const express = require('express');

const AuthMiddleware = require('./utils/AuthMiddleware');
const UserController = require('./controllers/UsersController');
const RestaurantController = require('./controllers/RestaurantController');
const HealthCheckController = require('./controllers/HealthCheckController');
const TransactionController = require('./controllers/TransactionsController');
const AuthenticateController = require('./controllers/AuthenticateController');

const router = express.Router();

router.get('/', AuthMiddleware.apiKey, HealthCheckController.status);

router.post('/create', AuthMiddleware.apiKey, UserController.create);

router.post('/login', AuthMiddleware.apiKey, AuthenticateController.login);
router.get('/logout', AuthMiddleware.userAuth, AuthenticateController.logout);

router.get('/restaurants/:city', AuthMiddleware.userAuth, RestaurantController.getRestaurants);

router.get('/transactions', AuthMiddleware.userAuth, TransactionController.findTransactions);

module.exports = router;