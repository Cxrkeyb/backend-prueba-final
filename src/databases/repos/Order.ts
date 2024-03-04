import { connection } from "../postgresql";
import { Order } from "../entities/models";

const orderRepo = connection.getRepository(Order);

export { orderRepo as OrderRepo };
