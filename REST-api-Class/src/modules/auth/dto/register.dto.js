import JOI from "joi";
import BaseDto from "../../common/dto/base.dto.js";

class RegisterDto extends BaseDto {
  static schema = JOI.object({
    username: JOI.string().min(3).max(30).required(),
    email: JOI.string().email().required(),
    password: JOI.string()
      .message("Password must be at least 8 characters long")
      .min(8)
      .required(),
    role: JOI.string().valid("user", "admin").default("user"),
  });
}

export default RegisterDto;
