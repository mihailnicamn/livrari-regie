import { Elysia } from "elysia";
import users from "./routes/users";
import markets from "./routes/markets";
import cart from "./routes/cart";
import derivations from "./derivations";
import { cookie } from '@elysiajs/cookie'
import { cors } from '@elysiajs/cors'
const app = derivations(new Elysia())
  .get("/", ({ userId }) => ({ userId }))
app.use(users);
app.use(markets);
app.use(cart);
app.listen(3012);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
