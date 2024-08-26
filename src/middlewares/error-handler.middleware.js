export const  ExceptionHandlerMiddleware = (error,_,res,__) => {

    if(error.isException){

        return res.status(error.status).send({
            name : error.name,
            message : error.message
        })
    }

    res.status(500).send({
        message : 'Internal Server Error',
        ERR : error.message
    })
}