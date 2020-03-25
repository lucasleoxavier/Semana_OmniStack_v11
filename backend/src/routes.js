const express = require('express');
const crypto = require('crypto');
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
routes.post('/ongs', ongController.create);

// Cadastra um novo caso
routes.post('/incidents', incidentController.create);

// Lista os casos
routes.get('/incidents', incidentController.index);

// Lista os casos específicos de uma Ong
routes.get('/profile', profileController.index);

// Apaga um caso
routes.delete('/incidents/:id', incidentController.delete);

module.exports = routes;