const {User} = require('../Users_module/model')


const getUser = async (req, res)=>{
    let users = await User.find()
    res.send(users);

}

const getUserById = async (req, res)=>{
    let user = await User.findById(req.params.id)
    res.send(user);
}

const createNewUser = async (req, res)=>{
    let newUser = await new User(req.body);
    newUser = await newUser.save()
    res.send(newUser)
    return
}

const updateUser = async (req, res)=>{
    let user = await User.findById(req.params.id)

    user = await user.updateOne(req.body)
    res.send(user)
    return
}
const deleteUser = async (req, res)=>{
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send({message:'The user with the given ID was not found'});
    res.send(user);
    return
}

module.exports = {
    getUser,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser
}