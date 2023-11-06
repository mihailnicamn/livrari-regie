import { Elysia } from 'elysia'
import { cookie } from '@elysiajs/cookie'
import { cors } from '@elysiajs/cors'
import { v4 as uuid } from 'uuid'
export default (app:Elysia) => app
.use(cookie())
.derive(({ request: { headers }, store, getDate, cookie, setCookie }) => {
    let userId = cookie.userId
    if(!userId)  {
        userId = uuid();
        setCookie('userId',userId)
    }
    return {
        userId
    }
})