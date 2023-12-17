//  api/users/[userid]/tasks

import connectDb from "@/helper/db";
import { getResponseMessage } from "@/helper/responseMessage";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";


export const GET = async (request, { params }) => {
  const { userId } = params;
  await connectDb()
  try {
    const tasks = await Task.find({ userId: userId });

    return NextResponse.json(tasks);
  } catch (error) {
    console.log(error);
    return getResponseMessage("faild to find any task", 404, false);
  }
};
