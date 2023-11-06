import nookies from 'nookies';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
const baseUrl = 'http://localhost:3012'

const getCookie = (ctx) => {
    return nookies.get(ctx)
}
const setCookie = (ctx, name, value, options) => {
    return nookies.set(ctx, name, value, options)
}

const request = (context) => {
    let cookie = context ? getCookie(context) : getCookie()
    const accessToken = cookie.accessToken
    let userId = cookie['__next-userId']
    if (!userId) {
        userId = uuid();
        setCookie(context, '__next-userId', userId)
    }
    const headers = { 'next-userId': userId }
    return {
        get: (url, params) => {
            const target = baseUrl + url
            return axios.get('http://localhost:3002/api/proxy?target=' + target, { params, headers })
        },
        post: (url, data) => {
            const target = baseUrl + url
            return axios.post('http://localhost:3002/api/proxy?target=' + target, data, { headers })
        },
        put: (url, data) => {
            const target = baseUrl + url
            return axios.put('http://localhost:3002/api/proxy?target=' + target, data, { headers })
        },
        delete: (url) => {
            const target = baseUrl + url
            return axios.delete('http://localhost:3002/api/proxy?target=' + target, { headers })
        },
    }
}

export { request }