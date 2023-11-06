import { Hono } from 'hono'
import { cors } from 'hono/cors'
import supabase from '../supabase'
const app = new Hono()
app.use(cors())
app.get('/', async (c) => {
    const headers = c.req.headers;
    const userId = headers.get('next-userid');
    const { data: cart, error } = await supabase.from('carts').select('*').eq('sessionId', userId).single()
    if (error) return c.json([])
    return c.json(cart.cart ? JSON.parse(cart.cart) : [])
})

app.get('/add/:prodId', async (c) => {
    const headers = c.req.headers;
    const userId = headers.get('next-userid');
    const id = await c.req.param('prodId');
    let quantity = await c.req.query('quantity');
    quantity = parseInt(quantity);
    if (isNaN(quantity)) return c.json({ error: 'quantity must be a number' })
    const { data: product, error } = await supabase.from('product').select('*').eq('_id', id).single();
    let { data: cart, error: cartError } = await supabase.from('carts').select('*').eq('sessionId', userId).single();
    if (cartError || !cart) cart = [];
    const cartData = cart.cart ? JSON.parse(cart.cart) : []
    cartData.push({ ...product, quantity })
    const { data, error: updateError } = await supabase.from('carts').upsert({ cart: JSON.stringify(cartData), sessionId: userId }).eq('sessionId', userId);
    console.log({ error: updateError })
    return c.json(cartData)
})

export default app