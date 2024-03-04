import { UserType } from "../../../../databases/entities/models/User";

interface RegisterInput {
  email: string;
  password: string;
  type?: UserType;
}

export default RegisterInput;
