import { connection } from "../postgresql";
import { Product } from "../entities/models";

const productRepo = connection.getRepository(Product);

export { productRepo as ProductRepo };
