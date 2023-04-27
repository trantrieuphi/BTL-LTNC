import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  
});

class UserModel {
  constructor() {
    this.user = mongoose.model('User', userSchema);
  }

  async create(username, password) {
    const user = await this.user.create({ username, password });
    return user;
  }

  async findUser(username) {
    const user = await this.user.findOne({ username });
    return user;
  }

  async findUserById(id) {
    const user = await this.user.findById(id);
    return user;
  }

  async updateUser(id, data) {
    const user = await this.user.findByIdAndUpdate(id, data, { new: true });
    return user;
  }

  async deleteUser(id) {
    const user = await this.user.findByIdAndDelete(id);
    return user;
  }

  async findAllUsers() {
    const users = await this.user.find();
    return users;
  }

}

const User = new UserModel();

export default User ;
