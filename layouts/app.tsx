
import React from "react"
import AddToHomeScreen from '@/components/pwa/prompt';
import { MobileNav } from "@/components/nav"
import { screenClassNames } from "@/constants"
import axios from 'axios'
import useUserAgent from "@/components/user-agent";
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
    const { isMobile } = useUserAgent();
    if (!isMobile) return (
        <div>
            Doar pe mobil momentan! 😉
        </div>
    )
    return (
        <main>
            {children}
            <Mobile me={me} />
        </main>
    )
}