import React from "react"
import { Button, Card, CardFooter, CardHeader, Chip } from "@nextui-org/react"
import Image from "@/components/image";
import {
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "@nextui-org/react";
interface MarketHours {
    _id: string
    day: string
    open: string
    close: string
}
interface MarketProps {
    _id: string
    name: string
    icon: string
    scope: string
}
interface Category {
    _id: string
    name: string
    description: string
    image: string
}
interface Product {
    _id: string
    name: string
    description: string
    images: string[]
    price: number
    categories: Category[]
}
interface Props {
    _id: string
    name: string
    description: string
    image: string
    hours: MarketHours[]
    products: Product[]
    props: MarketProps[]
}
const MarketInfo = ({ name, description, image, props }: { name: string, description: string, image: string, props: MarketProps[] }) => {
    const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
    return (<>
        <Button isIconOnly onClick={onOpenChange} variant='light' className="text-white [text-shadow:_1px_1px_2px_rgb(0_0_0_/_50%)]">
            <i className="fa-solid fa-circle-info" />
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>{name}</ModalHeader>
                        <ModalBody>
                            <p>{description}</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button onPress={onClose}>Închide</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    </>)
}
const Product = ({ product }: { product: Product }) => {
    const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
    return (<>
        <Card className="w-full h-32 mt-2 col-span-12 sm:col-span-5 ml-2 mr-2 mb-2">
            <CardHeader className="absolute top-0 left-0 w-full z-20" onClick={onOpen}>
                <h4 className="text-white text-2xl font-bold [text-shadow:_1px_1px_5px_rgb(0_0_0_/_100%)]">{product.name}</h4>
            </CardHeader>
            <Image
                onClick={onOpen}
                alt="Card example background"
                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                src={product.images[0]}
            />
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 h-12 border-zinc-100 z-10 justify-between">
                <div id="market-props-chips" className="flex flex-row items-start justify-start h-full w-[calc(80%)] overflow-scroll gap-2 overflow-x-hidden">
                    {product.categories.map((category, index) => (<Chip variant='flat' startContent={<i className={`fa-solid fa-box`} />} key={index} className="text-tiny text-white [text-shadow:_1px_1px_2px_rgb(0_0_0_/_50%)]" radius="full" size="sm">
                        {category.name}
                    </Chip>))}
                </div>
                <Button className="text-tiny text-white [text-shadow:_1px_1px_2px_rgb(0_0_0_/_50%)]" variant='flat' radius="full" size="sm">
                    Adaugă în coș
                </Button>
            </CardFooter>
        </Card>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>{product.name}</ModalHeader>
                        <ModalBody>
                            <p>{product.description}</p>
                            <div className='flex flex-col'>
                                <Button className="" variant='flat' size="sm">
                                    Adaugă în coș
                                </Button>
                            </div>
                        </ModalBody>
                        <ModalFooter className='flex flex-row justify-center items-center'>
                            <Button onPress={onClose}>Închide</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    </>)
}
const dateDiff = (date1: Date, date2: Date) => {
    const days = Math.floor((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24))
    const hours = Math.floor((date2.getTime() - date1.getTime()) / (1000 * 60 * 60))
    const minutes = Math.floor((date2.getTime() - date1.getTime()) / (1000 * 60))
    const seconds = Math.floor((date2.getTime() - date1.getTime()) / (1000))
    const ms = Math.floor((date2.getTime() - date1.getTime()))
    return { days, hours, minutes, seconds, ms }
}
const getHoursContext = (hours: MarketHours | undefined) => {
    if (!hours) return {
        _open: null,
        _close: null,
        _now: null,
        _closesIn: null,
        _opensIn: null,
        _closesInMinutes: null,
        _opensInMinutes: null,
        _closesInHours: null,
        _opensInHours: null,
        _opened: null,
        _closed: null
    }
    const _now = new Date()
    const _tomorrow = new Date(_now.getTime() + 24 * 60 * 60 * 1000)
    const _tomorrowDate = `${_tomorrow.getMonth() + 1}/${_tomorrow.getDate()}/${_tomorrow.getFullYear()}`
    const _date = `${_now.getMonth() + 1}/${_now.getDate()}/${_now.getFullYear()}`
    const _open = new Date(`${_date} ${hours.open}`)
    const _close = new Date(`${_date} ${hours.close}`)
    const _nextOpen = new Date(`${_tomorrowDate} ${hours.open}`)
    const _closesIn = dateDiff(_now, _close)
    const _opensIn = dateDiff(_now, _nextOpen)
    const _closesInMinutes = _closesIn.minutes - _closesIn.hours * 60
    const _opensInMinutes = _opensIn.minutes - _opensIn.hours * 60
    const _closesInHours = _closesIn.hours - _closesIn.days * 24
    const _opensInHours = _opensIn.hours - _opensIn.days * 24
    const _opened = _now.getTime() >= _open.getTime() && _now.getTime() <= _close.getTime()
    const _closed = _now.getTime() < _open.getTime() || _now.getTime() > _close.getTime()
    return {
        _open,
        _close,
        _now,
        _closesIn,
        _opensIn,
        _closesInMinutes,
        _opensInMinutes,
        _closesInHours,
        _opensInHours,
        _opened,
        _closed
    }
}
const MarketHeader = ({ name, description, image, props, hours }: { name: string, description: string, image: string, props: MarketProps[], hours: MarketHours[] }) => {
    const _type = props.find(prop => prop.scope === 'type')
    const _today = getHoursContext(hours.find(hour => hour.day.toLowerCase() === new Date().toLocaleDateString('ro-RO', { weekday: 'long' })))
    return (<>
        <Card className="w-full fixed top-0 h-32 rounded-none rounded-b-lg">
            <Image
                alt="Card example background"
                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                src={image}
            />
            <CardHeader className="absolute top-0 left-0 w-full z-20 flex justify-between">
                <h4 className="flex gap-2 justify-center items-center text-white text-2xl font-bold [text-shadow:_1px_1px_5px_rgb(0_0_0_/_100%)]">
                    <i className={`fa-solid fa-${_type?.icon}`} />
                    <span> {name}</span>
                </h4>
                <MarketInfo name={name} description={description} image={image} props={props} />
            </CardHeader>
            <CardFooter className="absolute bottom-0 left-0 w-full z-20 flex justify-between">
                {_today._opened && <>
                    <Chip color="success" variant='shadow' startContent={<i className="fa-solid fa-circle-check" />}>
                        <span>Deschis</span>
                    </Chip>
                    <Chip color={_today._closesIn.days < 1 ? 'primary' : 'warning'} variant='shadow' startContent={<i className="fa-solid fa-clock" />}>
                        <span>Închide în {_today._closesInHours > 0 ? `${_today._closesInHours} ore și ${_today._closesInMinutes} minute` : `${_today._closesInMinutes} minute`}</span>
                    </Chip>
                </>}
                {_today._closed && <>
                    <Chip color="danger" variant='shadow' startContent={<i className="fa-solid fa-circle-xmark" />}>
                        <span>Închis</span>
                    </Chip>
                    <Chip color={_today._opensIn.days < 1 ? 'primary' : 'warning'} variant='shadow' startContent={<i className="fa-solid fa-clock" />}>
                        <span>Deschide în {_today._opensInHours > 0 ? `${_today._opensInHours} ore și ${_today._opensInMinutes} minute` : `${_today._opensInMinutes} minute`}</span>
                    </Chip>
                </>}
            </CardFooter>
        </Card>
    </>)
}
export default function Market({ _id, name, description, image, products, props, hours }: Props) {
    return (<>
        <MarketHeader name={name} description={description} image={image} props={props} hours={hours} />
        <div className='flex flex-col items-center justify-center w-full h-full pl-2 pr-2 mt-32 mb-16 pb-10 h-3/2 overflow-y-scroll overflow-x-hidden'>
            {products.map((product, index) => (<Product key={index} product={product} />))}
        </div>
    </>)
}
