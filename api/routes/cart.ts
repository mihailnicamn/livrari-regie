import { Elysia, t } from "elysia";
import supabase from "../supabase";
import derivations from "../derivations";
import { cors } from '@elysiajs/cors'
export default derivations(new Elysia({ prefix: "/cart" }))
    .get('/add/:id', async ({ params: { id }, query: { quantity }, cookie, setCookie, removeCookie, userId }) => {
        quantity = parseInt(quantity);
        console.log({ quantity })
        if (isNaN(quantity)) return 'quantity must be a number'
        const product = await supabase.from('product').select('*').eq('_id', id).single();
        if (product.error) return product.error
        let cart = await supabase.from('carts').select('*').eq('sessionId', userId);
        console.log('cart', { cart })
        let isNew = !Array.isArray(cart.data) || cart.error
        if (cart.error) cart = [];
        else cart = cart.data[0]
        const cartData = cart.cart ? JSON.parse(cart.cart) : []
        cartData.push({ ...product.data, quantity: parseInt(quantity) })
        //update cart 
        console.log({ isNew })
        if (isNew) await supabase.from('carts').insert({ cart: JSON.stringify(cartData), sessionId: userId });
        else await supabase.from('carts').update({ cart: JSON.stringify(cartData) }).eq('sessionId', userId);
    })
    .get('/', async ({ cookie, userId }) => {
        const { data: cart, error } = await supabase.from('carts').select('*').eq('sessionId', userId).single()
        if (error) return []
        return cart.cart ? JSON.parse(cart.cart) : []
    })


