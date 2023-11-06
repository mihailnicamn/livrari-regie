import React from "react"
import axios from "axios"
import AppLayout from "@/layouts/app"
import { request } from "@/state/request"

export default function Cos({ me, cos }) {
  return (<>
    <AppLayout me={me}>
      <div className='flex flex-col items-center justify-center w-full h-full pt-2'>
        <h1 className='text-3xl font-bold'>Cos</h1>
      </div>
      <pre>
        {JSON.stringify(cos, null, 2)}
      </pre>
    </AppLayout>
  </>)
}

export async function getServerSideProps(context) {
  const req = request(context)
  const me = await req.get('/users/me').then(res => res.data)
  const cart = await req.get('/cart').then(res => res.data)
  return {
    props: {
      me,
      cos: cart
    }
  }
}