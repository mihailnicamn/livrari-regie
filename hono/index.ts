import { Hono } from 'hono'
import { cors } from 'hono/cors'
import users from './routes/users'
import markets from './routes/markets'
import cart from './routes/cart'
import { serveStatic } from 'hono/bun'
const app = new Hono()
app.use(cors())
app.use('/*', serveStatic({ root: './dist' }))
app.route('/users', users)
app.route('/markets', markets)
app.route('/cart', cart)
export default app
