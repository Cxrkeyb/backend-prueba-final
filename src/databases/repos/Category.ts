import { connection } from "../postgresql";
import { Category } from "../entities/models";

const categoryRepo = connection.getRepository(Category);

export { categoryRepo as CategoryRepo };
