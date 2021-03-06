const { Router } = require("express");
const cartRouter = Router();
const chalk = require("chalk");

const { Cart, Product } = require("../db/models/index");

cartRouter.post('/add/:id', async (req, res) => {
    try {
        const { quantity } = req.query;
        const { id } = req.params;
        const cart = await Cart.findByPk(req.cart_id);
        console.log(quantity)
        await cart.addItem(id, quantity);
        const updatedCart = await Cart.findOne({
            where: {
                id: req.cart_id
            },
            include: [Product]
        });
        console.log(chalk.cyan('Product Added'));
        res.send(updatedCart);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});


module.exports = {
    path: '/cart',
    router: cartRouter
}