import { Request, Response } from "express";
import { CreateUser, RegisterUser } from "../models/users.model";
import {
  authenticateUser,
  createBooking,
  createUser,
  deleteUser,
  getUsers,
  registerUser,
  updateUser,
} from "../services/users.service";

export const users = async (req: Request, res: Response) => {
  const { id, name, email, employer_id, limit } = req.query;

  try {
    const user = await getUsers(
      Number(id),
      name as string,
      email as string,
      Number(employer_id),
      limit ? Number(limit) : 100
    );

    return res.json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const newUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // technically you can create a User with a deactivated Employer acct
  // we will handle this on the front-end but good to remember if API is opened up
  const body: CreateUser = req.body;

  if (!body || !body.name || !body.email || !body.employer_id) {
    return res.status(400).send("Missing required body properties");
  }

  try {
    const user = await createUser(body);

    return res.json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const bookCoach = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const body = req.body;

  if (!body || !body.user_id || !body.coach_id) {
    return res.status(400).send("Missing required body properties");
  }

  try {
    const userCoach = await createBooking(body);

    return res.json(userCoach);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const registerNewUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const body: RegisterUser = req.body;

  if (
    !body ||
    !body.name ||
    !body.email ||
    !body.invite_code ||
    !body.password
  ) {
    return res.status(400).send("Missing required body properties");
  }

  try {
    const user = await registerUser(body);

    return res.json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const deactivateUser = async (req: Request, res: Response) => {
  const id = req.query.id;

  try {
    if (!id) {
      return res.status(400).send("Missing required parameters");
    }

    const user = await deleteUser(Number(id));

    return res.json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const updateUserInfo = async (req: Request, res: Response) => {
  if (!req.body.id || !req.body.email) {
    return res.status(400).send("Missing required parameters!");
  }

  try {
    const updatedUser = await updateUser(req.body);

    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const userLogin = async (req: Request, res: Response) => {
  const { password, email } = req.body;

  if (!password || !email) {
    return res.status(400).send("Missing required body elements!");
  }

  try {
    const user = await authenticateUser(email, password);

    return res.json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};
