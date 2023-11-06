
import { gradient } from "@/constants"
export interface LogoProps {
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
}
export default function Logo({ size = 'md' }: LogoProps) {
    return (<>
        <div className={`flex flex-col items-center justify-center w-full h-full pt-2`}>
            <h1 className={`text-${size} font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-blue-400 to-green-600 `}>LivrăriRegie</h1>
        </div>
    </>)
}