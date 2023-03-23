import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
		toJSON: false,
	},
	role: {
		type: String,
		default: "admin",// 20 ve 43. satirda admin yollayinca role admin oluyor. ikisininde ayni anda admin olarak girilmasi gerekli
		enum: ["user", "admin"],
	},
});

UserSchema.pre("save", async function (next) {
	try {
		if (this.isNew) {
			const salt = await bcrypt.genSalt(10);
			const hashed = await bcrypt.hash(this.password, salt);
			this.password = hashed;
		}

		next();
	} catch (e) {
		next(error);
	}
});

UserSchema.methods.isValidPass = async function (pass) {
	return await bcrypt.compare(pass, this.password);
};

const User = mongoose.model("admin", UserSchema); // 20 ve 43. satirda admin yollayinca role admin oluyor. ikisininde ayni anda admin olarak girilmasi gerekli

export default User;
