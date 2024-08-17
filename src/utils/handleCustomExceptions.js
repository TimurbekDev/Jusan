import { CustomException } from "./customException.js";

export const handleCustomExceptions = (err, req, res, next) => {
    
    if (err instanceof CustomException) {
        return res.status(err.status).json({ 
                   error: err.message 
               });
    } else if (err instanceof TypeError) {
        return res.status(400).json({ error: err.message });
    }

    res.status(500).json({ error: err.message });
}