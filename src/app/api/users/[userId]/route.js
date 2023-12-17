import { NextResponse } from "next/server";
import { User } from "@/models/user";
import connectDb from "@/helper/db";


//get user
export const GET = async (request, { params }) => {
  const { userId } = params;
  await connectDb()
  try {
    const user = await User.findById(userId).select("-password");
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "User Not found",
      success: false,
    });
  }
};

//delete user
export async function DELETE(request, { params }) {
  //   console.log(params);
  await connectDb()
  const { userId } = params;
  try {
    await User.deleteOne({
      _id: userId,
    });
    return NextResponse.json({
      message: " user deleted",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "error in deleting user",
      success: false,
    });
  }
}


//update user


export const PUT = async (request, { params }) => {
    const { userId } = params;
    const {name ,password,about,profileURL} =await request.json()

    await connectDb()
    try {
      const user = await User.findById(userId);

        user.name=name;
        user.about=about;
        user.password=password;
        user.profileURL=profileURL;

        const updatedUser = await user.save()


      return NextResponse.json(updatedUser);
    } catch (error) {
      console.log(error);
      return NextResponse.json({
        message: "Failed to update user",
        success: false,
      });
    }
  };