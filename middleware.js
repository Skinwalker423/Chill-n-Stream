import { NextResponse } from "next/server";

export async function middleware(req, ev){
    console.log('this is the middleware');
    NextResponse.next();
    // const {pathname} = req.nextUrl;
    // const token = req?.cookies?.get("token") || null;
    // if(!token){
    //     return 'not logged in';
    // }
    
    // if(token){
    //     console.log('going home page');
    //     return NextResponse.next();
    // } else {
    //     console.log('login page');
    //     return 'not logged in';
    // }
    // const {pathname} = req.nextUrl;

    // if(issuer && token){
    //     console.log('continuing to home page');
    //     return NextResponse.next();
    // } else {
    //     console.log('redirecting to login page');
    //     return NextResponse.redirect('/login');
    // }
    
}