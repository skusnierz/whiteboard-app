import { addNewMessage } from './../controllers/messageController';
import express, { Router } from "express";
import {getMessages} from "../controllers/messageController";

export const router: Router = express.Router();

router.get('/message', getMessages);
router.post('/message', addNewMessage);