import { omit } from "lodash";
import { DocumentDefinition, FilterQuery } from "mongoose";
import User, { UserDocument } from "../model/user.model";

export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    return await User.create(input);
  } catch (err) {
    throw new Error(err);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: UserDocument["email"];
  password: string;
}) {
  const user = await User.findOne({ email });
  if (!user) return false;

  const isValid = await user.comparePassword(password);
  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return User.findOne(query).lean(); // lean은 plain JSON 객체를 받아오기 위함
}
