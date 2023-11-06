
import React from "react"
import AddToHomeScreen from '@/components/pwa/prompt';
import { MobileNav } from "@/components/nav"
import { screenClassNames } from "@/constants"
import axios from 'axios'
const Mobile = ({ me }) => {
    return (<>
        <MobileNav menu={[
            { title: 'Acasă', href: '/', icon: 'house' },
            { title: 'Comenzi', href: '/comenzi', icon: 'clipboard-list' },
            { title: 'Coșul meu', href: '/cos', icon: 'cart-shopping' },
            { title: 'Contul meu', href: '/me', icon: 'user' },
        ]} />
    </>)
}
const Tablet = () => {
    return (<>tablet</>)
}
const Desktop = () => {
    return (<>desktop</>)
}

export interface AppProps {
    children?: React.ReactNode
}

export default function App({ children, me }: AppProps) {
    return (
        <main>
            {children}
            <Mobile me={me} />
        </main>
    )
}