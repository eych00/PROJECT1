const userModel = require("./model");
const bcrypt = require("bcryptjs");
const { createToken} = require("./auth")
const storeUser = async (userdata) => {
    try {
        const password = await bcrypt.hashSync(userdata.password, 10);
        const user = new userModel({
            ...userdata,
            password,
        });
        await user.save();
    } catch (err) {
        throw {
            msg: "failed to create user, please check your input",
            code: 404,
        };
    }
};

const getuserById = async (userId) => {
    try{
        const user = await userModel.findOne({
            _id: userId,
        });
        return user;
    } catch (error) {
        throw {
            msg: "unable to find user",
            code: 400,
        };
    }
};

const login = async (userData) => {
    const user = await getUser(userData.email);
    if (!user) {
      throw {
        msg: "Invalid login iformation",
        code: 404,
      };
    }
    const passwordMatch = await bcrypt.compareSync(
      userData.password,
      user.password
    );
    if (!passwordMatch) {
      throw {
        msg: "Invalid login information",
        code: 401,
      };
    }
    const token = await createToken(user.id);
    return {
      userId: user.id,
      token,
    };
  };
  module.exports = {
    storeUser,
    getUser,
    login,
    getUserById,
  };