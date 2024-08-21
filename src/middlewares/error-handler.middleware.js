export const  ExceptionHandlerMiddleware = (error,req,res,next) => {

    if(error.isException){

        return res.status(error.status).send({
            name : error.name,
            message : error.message
        })
    }

    res.status(500).send({
        message : 'Internal Server Error'
    })
}