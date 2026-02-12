import {Router} from 'express';
import{getUsers, createuser,updateUser, deleteUser} from '../controller/user.controller.js';

const userRoutes =Router();

userRoutes.get('/users', getUsers)
userRoutes.post('/create',createuser)


userRoutes.put('/users/:id',updateUser )

userRoutes.delete('/users/:id',deleteUser )









export default userRoutes
