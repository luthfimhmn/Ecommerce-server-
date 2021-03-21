const errorHandler = (err, req, res, next) => {
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
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
    } else if (err.name === 'NotAdmin') {
        res.status(400).json({ message: `You're not admin` })
    } else if (err.name === 'failedupdate'){
        res.status(400).json({message: 'Fail update' })
    } else {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}


module.exports = errorHandler;