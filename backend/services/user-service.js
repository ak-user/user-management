const User = require('../models/user');
const xlsx = require('xlsx');

const createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    throw new Error('Failed to create user');
  }
};

const getUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

const updateUser = async (id, userData) => {
  try {
    const [updated] = await User.update(userData, { where: { id } });
    if (updated) {
      const updatedUser = await User.findOne({ where: { id } });
      return updatedUser;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    throw new Error('Failed to update user');
  }
};

const deleteUser = async (id) => {
  try {
    const deleted = await User.destroy({ where: { id } });
    if (deleted) {
      return true;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    throw new Error('Failed to delete user');
  }
};

const importUsers = async (fileBuffer) => {
  try {
    const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
    const sheet_name_list = workbook.SheetNames;
    const users = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

    const formattedUsers = users.map((user) => ({
      name: user.Name,
      email: user.Email,
      createdAt: new Date(user['Created At']),
    }));

    await User.bulkCreate(formattedUsers);

    return { message: 'Users imported successfully' };
  } catch (error) {
    throw new Error('Failed to import users');
  }
};

module.exports = { createUser, getUsers, updateUser, deleteUser, importUsers };
