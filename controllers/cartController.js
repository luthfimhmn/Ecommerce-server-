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
        ProductId: req.params.prodId,
        UserId: req.user.id
      },
      include: [{ model: Product }],
      defaults: {
        ProductId: req.params.prodId,
        UserId: req.user.id,
        quantity: 1
      }
    })
      .then((cart) => {
        if (cart[1] === true) {
          res.status(201).json(cart[0])
        } else {
          if (cart[0].Product.stock > cart[0].quantity){
            return Cart.update({ quantity: cart[0].quantity + 1}, { where: { id: cart[0].id }, returning: true })
          } else {
            next(err)
          }
        }
      })
      .then((cart) => {
        res.status(200).json(cart)
      })
      .catch((err) => {
        next(err)
      });
  }

  static subtractCart (req,res,next) {
    Cart.findOne({
      where: {
        ProductId: req.params.prodId,
        UserId: req.user.id
      },
      include: [{model: Product}]
    })
      .then(cart => {
        if (cart.quantity > 0) {
          return Cart.update({ quantity: cart.quantity - 1}, {where: {id: cart.id}, returning: true})
        } else {
          next(err)
        }
      })
      .then(cart => {
        res.status(200).json(cart)
      })
      .catch(err => {
        next(err)
      })
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