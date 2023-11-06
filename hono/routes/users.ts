import supabase from "../supabase";
import { cors } from 'hono/cors'
import { Hono } from "hono";
import { getCookie, getSignedCookie, setCookie, setSignedCookie, deleteCookie } from 'hono/cookie'

const app = new Hono()
app.use(cors())

app.get('/me', async (c) => {

    const me = getCookie(c, 'me')
    const session = getCookie(c, 'session')
    const cart = getCookie(c, 'cart')

    return c.json({
        me,
        session,
        cart
    })

})

app.post('/signup', async (c) => {
    const { data, error } = await supabase.auth.signUp({
        email: c.body.email,
        password: c.body.password,
        options: {
            emailRedirectTo: process.env.APP_URL + `/supa`
        }
    })
    return c.json({
        data,
        error
    })
})

app.post('/signin', async (c) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: c.body.email,
        password: c.body.password,
    })
    setCookie(c, 'me', JSON.stringify(data.user))
    setCookie(c, 'session', JSON.stringify(data.session))
    return c.json({
        data,
        error
    })
})


export default app