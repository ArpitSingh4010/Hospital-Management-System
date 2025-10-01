// Error Handling Middleware
export class ErrorHandler extends Error{
    constructor(message,statusCode){ //custom error class
        super(message);              //super class constructor
        this.statusCode=statusCode;  //http status code
    }
}


export const errorMiddleware = (err,req,res,next) => {
    err.message = err.message || "Internal Server Error";  //default message
    err.statusCode = err.statusCode || 500;                //default status code
    if(err.code===11000){                                  //mongoose duplicate key error
        err.message=`Duplicate ${Object.keys(err.keyValue)} entered`; //custom message for duplicate key
        err=new ErrorHandler(err.message,400);              //400 bad request
    }
    if(err.name==="JsonWebTokenError"){                    //json web token error
        err=new ErrorHandler("Invalid Token",401);         //401 unauthorized
    }
    if(err.name==="TokenExpiredError"){                    //token expired error
        err=new ErrorHandler("Token Expired",401);         //401 unauthorized
    }
    if(err.name==="CastError"){                            //mongoose bad ObjectId error 
        err=new ErrorHandler("Invalid Id",400);            //400 bad request
    }

    // Handle destructuring of undefined body (TypeError)
    if (err instanceof TypeError && /Cannot destructure property/.test(err.message)) {
        err = new ErrorHandler("Please fill the full form", 400);
    }

    const errorMessage = err.errors ? Object.values(err.errors).map(error => error.message).join(', ') : err.message;
    
    
   return res.status(err.statusCode).json({
        success:false,
        message:errorMessage,
    });
   
}

