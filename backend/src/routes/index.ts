import { getLines } from './../controllers/lineController';
import { getRooms, addNewRoom, deleteRoom, roomExist, getUserRooms } from './../controllers/roomController';
import { register, login, getUsername } from './../controllers/userController';
import express, { Router } from "express";
import { authMiddleware } from '../middlewares/authMiddleware';
import { validParams } from '../middlewares/paramsValidation';

export const router: Router = express.Router();

router.post('/users', validParams(["email", "password", "username"]), register);
router.post('/users/login', validParams(["email", "password"]), login);
router.get('/users', authMiddleware, validParams(["email"]), getUsername);
router.get('/room', authMiddleware, getUserRooms);
router.get('/rooms/:name', authMiddleware, roomExist);
router.get('/rooms', authMiddleware, getRooms);
router.post('/rooms', authMiddleware, validParams(["name"]), addNewRoom);
router.delete('/room', authMiddleware, validParams(["name"]), deleteRoom);
router.get('/lines/:roomName', authMiddleware, getLines);