import { connection } from "../../databases/postgresql";
import { User } from "../entities/models";

const userRepo = connection.getRepository(User);

export { userRepo as UserRepo };
