import { getRooms, addNewRoom, deleteRoom } from './../controllers/roomController';
import { register, login, getUsername } from './../controllers/userController';
import express, { Router } from "express";
import { authMiddleware } from '../middlewares/authMiddleware';
import { validParams } from '../middlewares/paramsValidation';

export const router: Router = express.Router();

router.post('/user', validParams(["email", "password", "username"]), register);
router.post('/user/login', validParams(["email", "password"]), login);
router.get('/user', authMiddleware, validParams(["email"]), getUsername);
router.get('/room', authMiddleware, getRooms);
router.post('/room', authMiddleware, validParams(["name"]), addNewRoom);
router.delete('/room', authMiddleware, validParams(["name"]), deleteRoom);