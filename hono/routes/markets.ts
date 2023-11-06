import { Hono } from 'hono'
import { cors } from 'hono/cors'
import supabase from '../supabase'
const app = new Hono()
app.use(cors())

app.get('/', async (c) => {
    const [
        markets,
        marketProps,
        marketPropsPivot,
        products,
        productCategories,
        productCategoriesPivot,
        productMarketPivot,
        marketHoursPivot,
        hours,
    ] = await Promise.all([
        supabase.from('markets').select('*'),
        supabase.from('market_prop').select('*'),
        supabase.from('market_props_pivot').select('*'),
        supabase.from('product').select('*'),
        supabase.from('product_category').select('*'),
        supabase.from('product_category_pivot').select('*'),
        supabase.from('product_market_pivot').select('*'),
        supabase.from('market_hours_pivot').select('*'),
        supabase.from('hours').select('*'),
    ])
    const productData = products.data.map(product => {
        const productCategoryIds = productCategoriesPivot.data.filter(pivot => pivot.product_id === product.id).map(pivot => pivot.product_category_id)
        const productCategory = productCategories.data.filter(category => productCategoryIds.includes(category.id))
        return { ...product, categories: productCategory }
    })
    const marketData = markets.data.map(market => {
        const propIds = marketPropsPivot.data.filter(pivot => pivot.market === market._id).map(pivot => pivot.prop)
        const props = marketProps.data.filter(prop => propIds.includes(prop._id))

        const productIds = productMarketPivot.data.filter(pivot => pivot.market === market._id).map(pivot => pivot.product)
        const products = productData.filter(product => productIds.includes(product._id))

        const hoursIds = marketHoursPivot.data.filter(pivot => pivot.market === market._id).map(pivot => pivot.hour)
        const hoursData = hours.data.filter(hours => hoursIds.includes(hours._id))

        return {
            ...market,
            props,
            products,
            hours: hoursData
        }
    })
    console.log({ marketData })
    return c.json(marketData)
})


app.get('/:id', async (c) => {
    const id = await c.req.param('id')
    const [
        markets,
        marketProps,
        marketPropsPivot,
        products,
        productCategories,
        productCategoriesPivot,
        productMarketPivot,
        marketHoursPivot,
        hours,
    ] = await Promise.all([
        supabase.from('markets').select('*').eq('_id', id),
        supabase.from('market_prop').select('*'),
        supabase.from('market_props_pivot').select('*'),
        supabase.from('product').select('*').eq('market', id),
        supabase.from('product_category').select('*'),
        supabase.from('product_category_pivot').select('*'),
        supabase.from('product_market_pivot').select('*'),
        supabase.from('market_hours_pivot').select('*'),
        supabase.from('hours').select('*'),
    ])
    const productData = products.data.map(product => {
        const productCategoryIds = productCategoriesPivot.data.filter(pivot => pivot.product_id === product.id).map(pivot => pivot.product_category_id)
        const productCategory = productCategories.data.filter(category => productCategoryIds.includes(category.id))
        return { ...product, categories: productCategory }
    })
    const marketData = markets.data.map(market => {
        const propIds = marketPropsPivot.data.filter(pivot => pivot.market === market._id).map(pivot => pivot.prop)
        const props = marketProps.data.filter(prop => propIds.includes(prop._id))

        const productIds = productMarketPivot.data.filter(pivot => pivot.market === market._id).map(pivot => pivot.product)
        const products = productData.filter(product => productIds.includes(product._id))

        const hoursIds = marketHoursPivot.data.filter(pivot => pivot.market === market._id).map(pivot => pivot.hour)
        const hoursData = hours.data.filter(hours => hoursIds.includes(hours._id))

        return {
            ...market,
            props,
            products,
            hours: hoursData
        }
    })
    return c.json(marketData[0])
})

export default app