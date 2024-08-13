const User = require('../models/user');
const xlsx = require('xlsx');

const createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error(
      `Failed to create user: ${error.message || 'Unknown error'}`,
    );
  }
};

const getUsers = async (page = 0, pageSize = 10) => {
  try {
    const offset = page * pageSize;

    const users = await User.findAll({
      limit: pageSize,
      offset: offset,
    });

    const totalUsers = await User.count();

    return { users, totalUsers };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error(
      `Failed to fetch users: ${error.message || 'Unknown error'}`,
    );
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
    console.error(`Error updating user with ID ${id}:`, error);
    throw new Error(
      `Failed to update user: ${error.message || 'Unknown error'}`,
    );
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
    console.error(`Error deleting user with ID ${id}:`, error);
    throw new Error(
      `Failed to delete user: ${error.message || 'Unknown error'}`,
    );
  }
};

const importUsers = async (fileBuffer) => {
  try {
    let workbook;
    try {
      workbook = xlsx.read(fileBuffer, { type: 'buffer' });
    } catch (error) {
      throw new Error(
        'Failed to read the Excel file. Please ensure the file is in a valid format.',
      );
    }

    const sheet_name_list = workbook.SheetNames;
    if (sheet_name_list.length === 0) {
      throw new Error('No sheets found in the Excel file.');
    }

    let users;
    try {
      users = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    } catch (error) {
      throw new Error(
        'Failed to parse Excel sheet into JSON. Please check the structure of the file.',
      );
    }

    const formattedUsers = users.map((user) => ({
      name: user.Name,
      email: user.Email,
      createdAt: new Date(user['Created At']),
    }));

    try {
      await User.bulkCreate(formattedUsers);
    } catch (error) {
      throw new Error(
        'Failed to save users to the database. Please check the data and try again.',
      );
    }

    return { message: 'Users imported successfully' };
  } catch (error) {
    console.error('Error during user import:', error);
    throw new Error(`User import failed: ${error.message}`);
  }
};

module.exports = { createUser, getUsers, updateUser, deleteUser, importUsers };
