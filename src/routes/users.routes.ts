import express, { Request, Response } from "express";
import {
  bookCoach,
  deactivateUser,
  newUser,
  registerNewUser,
  updateUserInfo,
  userLogin,
  users,
  upcoming,
  past,
} from "../controllers/users.controller";
import cors from "cors";
import { publicCorsConfig } from "../util/corsOptions";

const usersRouter = express.Router();

usersRouter.get(
  "/users",
  cors(publicCorsConfig),
  async (req: Request, res: Response) => await users(req, res)
);

usersRouter.get(
  "/user/upcoming",
  cors(publicCorsConfig),
  async (req: Request, res: Response) => await upcoming(req, res)
);

usersRouter.get(
  "/user/past",
  cors(publicCorsConfig),
  async (req: Request, res: Response) => await past(req, res)
);

usersRouter.post(
  "/user/book-coach",
  cors(publicCorsConfig),
  async (req: Request, res: Response) => await bookCoach(req, res)
);

// this route is only used from ReTool
usersRouter.post(
  "/user",
  cors(publicCorsConfig),
  async (req: Request, res: Response) => await newUser(req, res)
);

usersRouter.post(
  "/user/register",
  cors(publicCorsConfig),
  async (req: Request, res: Response) => await registerNewUser(req, res)
);

usersRouter.delete(
  "/user",
  cors(publicCorsConfig),
  async (req: Request, res: Response) => await deactivateUser(req, res)
);

usersRouter.put(
  "/user",
  cors(publicCorsConfig),
  async (req: Request, res: Response) => await updateUserInfo(req, res)
);

usersRouter.post(
  "/user/login",
  cors(publicCorsConfig),
  async (req: Request, res: Response) => await userLogin(req, res)
);

export default usersRouter;
