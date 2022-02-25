const User = require("../models/user");
const STATIC = require("../constants");

const login = async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    try {
        const selectedUser = await User.findOne({ email, password });

        if (selectedUser) {
            res.status(200).send({
                status: STATIC.SUCCESS,
                message: STATIC.LOGIN_SUCCESS
            });
        } else {
            res.status(400).send({
                status: STATIC.FAIL,
                message: STATIC.INVALID_CREDENTIALS
            });
        }
    } catch (error) {
      res.status(400).send({
          status: FAIL,
          message: STATIC.LOGIN_FAILED
      });
    }
};

module.exports = { login };
