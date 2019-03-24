import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    default: false
  },
  email: {
    type: String,
    default: false
  },
  password: {
    type: String,
    default: false
  }
});

userSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password);
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10);
	}
};

export default mongoose.model('User', userSchema);