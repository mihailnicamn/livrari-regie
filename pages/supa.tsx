

interface Props {
    message?: string
    access_token?: string
    token_type?: string
    type?: number
    error?: string
    error_description?: string
    error_code?: number
    isError?: boolean
}
export default function Supa(props: Props) {
    const { isError } = props


    return (<>


    </>)

}


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const url = context.req.url
    const params = new URLSearchParams(url.split('#')[1])
    const message = params.get('message')
    const access_token = params.get('access_token')
    const token_type = params.get('token_type')
    const type = parseInt(params.get('type'))
    const error = params.get('error')
    const error_description = params.get('error_description')
    const error_code = parseInt(params.get('error_code'))
    const isError = error_code !== undefined
    const props: Props = {
        message,
        access_token,
        token_type,
        type,
        error,
        error_description,
        error_code,
        isError
    }
    return {
        props
    }
}