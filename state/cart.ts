import { signal } from '@preact/signals-react';
import { request } from '@/state/request'
const cart = signal([])
export const refreshCart = () => {
    request().get('/cart').then(res => {
        cart.value = res.data
    }).catch(err => {
        cart.value = []
    })
}
export const addToCart = (product, quantity) => {
    cart.value.push({ ...product, quantity })
    request().get(`/cart/add/${product._id}`, { quantity }).then(res => {
        console.log(res.data)
        refreshCart()
    })
}

export default cart