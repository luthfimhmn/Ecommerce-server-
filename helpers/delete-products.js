const {Product} = require('../models')

function deleteProducts (){
    return Product.destroy({where: {} })
}

module.exports = deleteProducts()