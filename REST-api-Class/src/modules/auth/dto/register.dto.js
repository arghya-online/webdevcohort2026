import JOI from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class RegisterDto extends BaseDto {
  static schema = JOI.object({
    name: JOI.string().min(2).max(50).required(),
    email: JOI.string().email().required(),
    password: JOI.string().min(8).required(),
    role: JOI.string().valid("user", "admin").default("user"),
  });
}

export default RegisterDto;
