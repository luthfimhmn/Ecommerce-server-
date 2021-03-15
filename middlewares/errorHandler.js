const errorHandler = (err, req, res, next) => {
    if (err.name === 'SequelizeValidationError') {
        let errors = []
        err.errors.forEach(el => {
            errors.push(el.message)
        });
        res.status(400).json({
            message: err.message,
            details: errors
        })
    } else if (err.name === 'invalidemailorpass') {
        res.status(400).json({ message: 'Invalid Email or Password' })
    }
    else {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}


module.exports = errorHandler;