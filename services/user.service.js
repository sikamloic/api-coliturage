const {User} = require('../models');
const ApiError = require('../utils/apiError')
const httpStatus = require('http-status')

const createUser = async(body) =>{
    console.log(body)
    const user = await getUserByPhoneNumber(body.telephone);
    if(user) throw new ApiError(httpStatus.BAD_REQUEST, "Ce numéro de téléphone existe déjà !!!")
    return await User.create(body)
}

const getUserById = async(id) =>{
    const user =  await User.findOne({where: {id: id}})
    if(!user) throw new ApiError(httpStatus.NOT_FOUND, "Identifiant introuvable")
    return user
}

const getAllUser = async() =>{
    const user = await User.findAll()
    return user
}

const getUserByPhoneNumber = async (telephone) => {
    const user = await User.findOne({ where: { telephone: telephone } });
    return user;
};

const getUserByEmail = async (email) => {
    const user = await User.findOne({ where: { email: email } });
    return user;
};

const updateUserById = async (userId, updateBody) => {
    console.log(updateBody);
    const user = await getUserById(userId);
    if (updateBody.telephone && (await User.isNumberTaken(updateBody.telephone, userId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Ce numéro existe déjà !!!');
    }
    await user.update(updateBody);
    return user;
};

module.exports = {
    createUser,
    getUserById,
    getAllUser,
    getUserByPhoneNumber,
    getUserByEmail,
    updateUserById
}