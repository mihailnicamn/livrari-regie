import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'


export default async function proxy(req: NextApiRequest, res: NextApiResponse) {
    const { method, query, headers, body } = req
    const { target } = query
    let params = query
    delete params.target
    const userId = headers['next-userid']
    return await axios({
        method: method as any,
        url: target as string,
        data: body,
        headers: { ['next-userid']: userId },
        params
    }).then(r => {
        res.status(r.status).json(r.data)
    }).catch(err => {
        res.status(err.response.status).json(err.response.data)
    })
}