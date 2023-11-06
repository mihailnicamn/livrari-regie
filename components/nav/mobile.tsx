import React from "react"
import { Button, Card, Tooltip, Badge } from "@nextui-org/react"
import { useRouter } from "next/router"
import { gradient } from "@/constants"
import cart, { refreshCart } from '@/state/cart';
export interface MenuItemProps {
    title: string,
    href: string,
    icon?: string,
}
export interface MobileNavProps {
    menu?: MenuItemProps[]
}
const MenuItem = ({ title, href, icon }: MenuItemProps) => {
    const router = useRouter()
    const prefetch = () => router.prefetch(href)
    const handleClick = () => router.push(href)
    const isActiveVariant = router.pathname === href ? 'shadow' : 'light'
    const isActiveColor = router.pathname === href ? 'primary' : 'default'
    const isActiveClassName = router.pathname === href ? `bg-gradient-to-tr from-blue-400 to-green-600 shadow-lg text-white` : ''
    if (href === '/cos' && cart.value.length > 0) return (<>
        <div className='flex flex-col items-center justify-center w-full h-full m-2'>
            <Tooltip content={title} placement='top'>
                <Badge content={`${cart.value.length}`} color="primary">
                    <Button className={isActiveClassName} isIconOnly variant={isActiveVariant} onMouseOver={prefetch} onClick={handleClick}>
                        <i className={`fa-solid fa-${icon}`} />
                    </Button>
                </Badge>
            </Tooltip>
        </div >
    </>)
    return (<>
        <div className='flex flex-col items-center justify-center w-full h-full m-2'>
            <Tooltip content={title} placement='top'>
                <Button className={isActiveClassName} isIconOnly variant={isActiveVariant} onMouseOver={prefetch} onClick={handleClick}>
                    <i className={`fa-solid fa-${icon}`} />
                </Button>
            </Tooltip>
        </div >
    </>)
}
export default function MobileNav({ menu = [] }: MobileNavProps) {
    React.useEffect(() => {
        refreshCart()
    }, [])
    return (<>
        <div className='fixed bottom-0 left-0 w-full h-20 p-2  z-50'>
            <Card className='w-full h-full flex flex-row items-center justify-around'>
                {menu.map((item, index) => {
                    return (<MenuItem key={index} {...item} />)
                })}
            </Card>
        </div>
    </>)
}