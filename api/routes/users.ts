import { Elysia, t } from "elysia";
import supabase from "../supabase";
import derivations from "../derivations";
export default derivations(new Elysia({ prefix: "/users" }))
    .get("/me", ({ cookie }) => {
        const me = cookie.me ? JSON.parse(cookie.me) : null
        const cart = cookie.cart ? JSON.parse(cookie.cart) : []
        return {
            me,
            cart
        }
    })
    .post("/signup", async ({ body }) => {
        const { data, error } = await supabase.auth.signUp({
            email: body.email,
            password: body.password,
            options: {
                emailRedirectTo: process.env.APP_URL + `/supa`
            }
        })
        console.log(data, error)
        return 'signin test'
    }, {
        body: t.Object({
            email: t.String(),
            password: t.String()
        })
    })
    .post("/signin", async ({ body, cookie, setCookie, removeCookie }) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: body.email,
            password: body.password,
        })
        setCookie('me', JSON.stringify(data.user))
        setCookie('session', JSON.stringify(data.session))
        console.log(data, error)
        return 'signin test'
    }, {
        body: t.Object({
            email: t.String(),
            password: t.String()
        })
    })
    .post("/signout", async ({ body, cookie }) => {
        cookie.me = null
    })


