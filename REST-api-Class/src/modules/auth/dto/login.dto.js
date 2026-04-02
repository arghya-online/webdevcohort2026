import JOI from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class LoginDto extends BaseDto {
  static schema = JOI.object({
    email: JOI.string().email().required(),
    password: JOI.string().min(6).required(),
  });
}

export default LoginDto;
