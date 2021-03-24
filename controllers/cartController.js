const { Cart, Product } = require('../models');

class CartController {
  static getCart (req,res,next) {
    Cart.findAll({where: {UserId: req.user.id}, include: [{ model: Product }] })
      .then(cart => {
        res.status(200).json(cart)
      })
      .catch(err => {
        next(err)
      })
  }

  static addToCart (req,res,next) {
    Cart.findOrCreate({
      where: {
        ProductId: req.params.prodId
      },
      defaults: {
        ProductId: req.params.prodId,
        UserId: req.user.id,
        quantity: 1
      }
    })
      .then((cart) => {
        console.log(cart[0].isNewRecord, 'INI HASIl');
        if (cart[0].isNewRecord === true) {
          Product.update({ stock: stock-1 }, {where: {id: req.params.prodId}, fields: ['stock'], returning: true})
            .then(product => {
              res.status(201).json(cart[0])
            })
            .catch(err => {
              next(err)
            })
        } else {
          res.status(200).json(cart[0])
        }
      })
      .catch((err) => {
        next(err)
      });
  }

  static removeFromCart (req,res,next) {
    Cart.destroy({ where: { id: req.params.id }})
      .then(()=> {
        res.status(200).json({ message: 'Remove from cart Success'})
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = CartController