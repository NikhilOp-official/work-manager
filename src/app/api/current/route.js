import connectDb from "@/helper/db";
import { getResponseMessage } from "@/helper/responseMessage";
import { User } from "@/models/user";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";


export const GET = async (request) => {
  await connectDb()
  const authToken = request.cookies.get("authToken")?.value;
  console.log(authToken);

  const data = jwt.verify(authToken, process.env.JWT_KEY);
  console.log(data);

  const user = await User.findById(data._id).select("-password");

  return NextResponse.json(user);
};
