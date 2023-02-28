import { Router } from 'express'
import ProductManager from '../managers/ProductManager.js'

const router = Router()

router.get('/', async(req, res) => {
    const productManager = new ProductManager('./src/data/products.json')
    let limits = parseInt(req.query.limits)
    if (isNaN(limits)) {
        limits = 0
    }

    const products = await productManager.getProducts(limits)
    res.render('home',{products})
    }
)

// router.get('/realtimeproducts', async(req, res) => {
//     // const productManager = new ProductManager('./src/data/products.json')
//     // let limits = parseInt(req.query.limits)
//     // if (isNaN(limits)) {
//     //     limits = 0
//     // }

//     // const products = await productManager.getProducts(limits)
//     res.render('realTImeProducts')
// })

export default router