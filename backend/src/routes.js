const express = require('express');
const crypto = require('crypto');
const { Joi, celebrate, Segments } = require('celebrate');

const connection = require('./database/connection');

const ongController = require('./controllers/OngController');
const incidentController = require('./controllers/IncidentController');
const profileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');



const routes = express.Router();

/**
 *  Rotas / Recursos
 **/

/** Métodos HTTP 
 * 
 * GET => Buscar uma informação do back-end
 * POST => Criar uma informação no back-end
 * PUT => Alterar uma informação no back-end
 * DELETE => Deletar uma informação no back-end
 * **/

/**
 * Tipos de parâmetros:
 * 
 * Query Params => Parâmetros nomeados enviados na rota após "?" (filtro, paginação)
 * concatena com "&"
 * 
 * Route Params => Parâmetros utilizados para identificar recursos
 * 
 * Request Body => Corpo da requisição, utilizado para criar ou alterar recursos
 */

/**
 * SQL => MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
 * NoSQL => MongoDB, CouchDB, etc
 */

/**
 * Driver => SELECT * FROM users
 * Query Builder => table('users').select('*').where()
 * 
 */

// Controla o login
routes.post('/sessions', sessionController.create)
// Lista as Ongs
routes.get('/ongs', ongController.index);

// Cadastra uma nova Ong
routes.post('/ongs', celebrate({
   [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      whatsapp: Joi.string().required().min(10).max(11),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2)
   })
}), ongController.create);

// Cadastra um novo caso
routes.post('/incidents', celebrate({
   [Segments.HEADERS] : Joi.object({
      authorization: Joi.string().required()
   }).unknown(),
   [Segments.BODY] : Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().required(),
   })
}), incidentController.create);

// Lista os casos
routes.get('/incidents', celebrate({
   [Segments.QUERY] : Joi.object().keys({
      page: Joi.number(),
   })
}), incidentController.index);

// Lista os casos específicos de uma Ong
routes.get('/profile', celebrate({
   [Segments.HEADERS] : Joi.object({
      authorization: Joi.string().required()
   }).unknown(),
}), profileController.index);

// Apaga um caso
routes.delete('/incidents/:id', celebrate({
   [Segments.PARAMS] : Joi.object().keys({
      id: Joi.number().required(),
   })
}), incidentController.delete);

module.exports = routes;