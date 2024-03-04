import { connection } from "../postgresql";
import { Client } from "../entities/models";

const clientRepo = connection.getRepository(Client);

export { clientRepo as ClientRepo };
