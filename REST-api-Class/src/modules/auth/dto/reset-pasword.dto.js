import JOI from "joi";
import BaseDto from "../../common/dto/base.dto.js";

class ResetPasswordDto extends BaseDto {
  static schema = JOI.object({
    password: JOI.string()
      .min(8)
      .max(128)
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
        ),
      )
      .message(
        "Password must be 8-128 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      )
      .required(),
  });
}

export default ResetPasswordDto;
