import * as authService from "./auth.service.js";
import ApiResponse from "../../utils/apiResponse.js";

const register = async (req, res) => {
  const user = await authService.register(req.body, res);
  ApiResponse.created(res, "Registration successful", user);
};

export { register };
