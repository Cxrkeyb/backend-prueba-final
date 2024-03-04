import { UserRepo } from "../../../../databases/repos";

export const getUserFromDatabase = async (email: string) => {
  return await UserRepo.findOne({ where: { email } });
};
