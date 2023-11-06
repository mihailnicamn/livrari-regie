import userId from "./ensure_id";
import { cors } from '@elysiajs/cors'
import { helmet } from 'elysia-helmet'

export default (app: Elysia) => userId(

    app
        .use(cors())
        .use(helmet())

)
