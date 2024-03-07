const {userService} = require('../services');
const catchAsync = require('../utils/catchAsync')

const createUser = catchAsync(async(req, res) =>{
  const user = await userService.createUser(req.body)
  res.send(user)
})

const getUserById = catchAsync(async(req, res) =>{
  const user = await userService.getUserById(req.params.id)
  res.send(user)
})

const getAllUser = catchAsync(async(req, res) =>{
  const user = await userService.getAllUser()
  res.send(user)
})

module.exports = {
  createUser,
  getUserById,
  getAllUser
}