import { CustomException } from "./customException.js";

export const handleCustomExceptions = (err, _, res, __) => {

    if (err instanceof CustomException) {
        return res.status(err.status).send({
            error: err.message
        });
    } else if (err instanceof TypeError) {
        return res.status(400).send({ error: err.message });
    }

    res.status(500).json({ error: err.message });
}