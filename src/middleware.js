import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    console.log("middleware");


    const authToken = request.cookies.get("authToken")?.value
    const loggedInUserNotAccessPaths = request.nextUrl.pathname ==="/login"   || request.nextUrl.pathname ==="/signup"  

            if(request.nextUrl.pathname ==="/api/login" || request.nextUrl.pathname ==="/api/users"){
                return
            }

        if(loggedInUserNotAccessPaths){
            //accessing not secured route
            if(authToken){
                return NextResponse.redirect(new URL('/profile/user', request.url))
            }
        }
        else{
            //accessing secured route
            if(!authToken){

                if(request.nextUrl.pathname.startsWith("/api")){
                    return  NextResponse.json({
                        message:"Access Denied",
                        success:false,

                    },{
                         status:401,
                    }
                   
                    )
                }



                return NextResponse.redirect(new URL('/login', request.url))
            }
        }

    // console.log(authToken);
  //return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher:["/",
  "/login",
  "/signup",
  "/add-task",
  "/show-task",
  "/profile/:path*",
  "/api/:path*"],
}