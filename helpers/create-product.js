
const { Product } = require('../models')
 
const createDummyProduct = () =>{
    return Product.create({
        name: 'Baju',
        image_url:'testing',
        price: 5000,
        stock: 10
    })
}

module.exports = createDummyProduct