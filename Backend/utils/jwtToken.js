export const generateToken = (user,message,statusCode,res) => {
    const token=user.generateJsonWebToken(); //generate token using user method
    //options for cookie
    const cookieName=user.role==="Admin"?"adminToken":"patientToken";
    res.status(statusCode).cookie(cookieName,token,{
        expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRES) * 24 * 60 * 60 * 1000), //cookie expires in days
        httpOnly:true, //cookie cannot be accessed or modified by browser
    }).json({
        success:true,
        message,
        user,
        token,
    });

}