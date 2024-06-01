const userService = require("../services/UserService");

const userController = {
  registerUser: async (req, res, next) => {
    try {
      const { email, password, username } = req.body;
      const { code, element } = await userService.registerUser({ email });
    } catch (error) {
      next(error);
    }
  },
  verifyOtp: async (req, res, next) => {
    try {
      const { otp, email, username, password } = req.body;
      console.log(otp);
      const user = await userService.verifyOtp({ otp, email, username, password });
      return res.json({
        user
      })
    } catch (error) {
        next(error);
    }
  },
};

module.exports = userController;
