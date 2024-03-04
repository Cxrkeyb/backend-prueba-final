import { connection } from "../postgresql";
import { Enterprise } from "../entities/models";

const enterpriseRepo = connection.getRepository(Enterprise);

export { enterpriseRepo as EnterpriseRepo };
