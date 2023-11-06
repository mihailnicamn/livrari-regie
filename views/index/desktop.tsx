import React from "react"
import AppLayout from "@/layouts/app"
import Logo from "@/components/logo"
import { useRouter } from "next/router"
import { Input, Button, Card, CardBody, CardFooter, CardHeader, Chip, Tooltip } from "@nextui-org/react"
import Image from "@/components/image"
interface MarketProps {
    _id: string
    name: string
    icon: string
    scope: string
}
interface Market {
    _id: string
    name: string
    description: string
    image: string
    props: MarketProps[]
}
interface Props {
    markets: Market[]
}
const MarketTitle = ({ market }: { market: Market }) => {
    return (<>
        <div className="absolute top-0 left-0 w-full h-full z-10">
            <CardHeader className="absolute top-0 left-0 w-full z-20">
                <h4 className="text-white text-2xl font-bold [text-shadow:_1px_1px_5px_rgb(0_0_0_/_100%)]">{market.name}</h4>
            </CardHeader>
        </div>
    </>)
}
const MarketDescription = ({ market }: { market: Market }) => {
    const router = useRouter()
    return (<>
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 h-12 border-zinc-100 z-10 justify-between">
            <div id="market-props-chips" className="flex flex-row items-start justify-start h-full w-[calc(80%)] overflow-scroll gap-2">
                {market.props.map((prop, index) => (<Chip variant='flat' startContent={<i className={`fa-solid fa-${prop.icon}`} />} key={index} className="text-tiny text-white [text-shadow:_1px_1px_2px_rgb(0_0_0_/_50%)]" radius="full" size="sm">
                    {prop.name}
                </Chip>))}
            </div>
            <Button className="text-tiny text-white [text-shadow:_1px_1px_2px_rgb(0_0_0_/_50%)]" variant='flat' radius="full" size="sm" onMouseOver={() => router.prefetch(`/market/${market._id}`)} onClick={() => router.push(`/market/${market._id}`)}>
                Alege
            </Button>
        </CardFooter>
    </>)
}
const Market = ({ market }: { market: Market }) => {
    return (<>
        <Card isFooterBlurred className="w-full h-32 col-span-12 sm:col-span-5 ml-2 mr-2 mb-2">
            <MarketTitle market={market} />
            <Image
                alt="Card example background"
                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                src={market.image}
            />
            <MarketDescription market={market} />
        </Card >
    </>)

}
export default function Acasa({ markets }: Props) {
    const [list, setList] = React.useState<Market[]>(markets)
    const [searching, setSearching] = React.useState<boolean>(false)
    const [filtering, setFiltering] = React.useState<boolean>(false)
    const toggleSearch = () => {
        setSearching(!searching);
        setFiltering(false);
    }
    const toggleFilter = () => {
        setFiltering(!filtering);
        setSearching(false);
    }
    return (<>
        <Card className='border-none shadow-none fixed top-0 left-0 w-[calc(100%-0.5rem)] z-50 p-1 m-1'>
            <div className='flex flex-row items-center justify-between  w-full h-full'>
                <Tooltip content='Filtrează' placement='bottom'>
                    <Button isIconOnly variant='flat' className='ml-1' onClick={toggleFilter}>
                        <i className='fa-solid fa-filter' />
                    </Button>
                </Tooltip>
                <h1 className='text-3xl font-bold mb-1'><Logo /></h1>
                <Tooltip content='Caută' placement='bottom'>
                    <Button isIconOnly variant='flat' className='mr-1' onClick={toggleSearch}>
                        <i className='fa-solid fa-search' />
                    </Button>
                </Tooltip>
            </div>
            {
                searching &&
                <div className='flex flex-row items-center justify-between w-full'>
                    <Input
                        key={'search'}
                        type="email"
                        placeholder="Caută"
                        labelPlacement='outside'
                    />
                </div>
            }
            {
                filtering &&
                <div className='flex flex-row items-center justify-between w-full'>
                    <Input
                        key={'filter'}
                        type="email"
                        placeholder="Filtrează"
                        labelPlacement='outside'
                    />
                </div>
            }
        </Card>
        <div className='flex flex-col items-center justify-center w-full h-full pl-2 pr-2 mt-16 mb-16 pb-10 h-3/2 overflow-y-scroll overflow-x-hidden'>
            {markets.map((market) => (<Market key={market._id} market={market} />))}
        </div>
    </>)
}