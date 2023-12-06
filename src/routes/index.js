/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API operations for user management
 */

/**
 * @swagger
 * /api/v2/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#'
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/../models/user.model/userRegisterSchema'
 *       400:
 *         description: Bad request, validation failed, or user already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v2/users/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               $ref: '#/../models/user.model/userRegisterSchema'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized, invalid credentials
 *       500:
 *         description: Internal server error
 */

import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import noteRoute from './note.rout';
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);
  router.use('/note', noteRoute);

  return router;
};

export default routes;
