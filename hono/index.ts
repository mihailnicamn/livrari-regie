import { Hono } from 'hono'
import { cors } from 'hono/cors'
import users from './routes/users'
import markets from './routes/markets'
import cart from './routes/cart'
const app = new Hono()
app.use(cors())
app.get('/', (c) => c.text('Hello Hono!'))

app.route('/users', users)
app.route('/markets', markets)
app.route('/cart', cart)

export default app
