import { Image as NextUIImage } from "@nextui-org/react";
interface Props {
    src: string;
    alt: string;
    width?: string;
    height?: string;
    className?: string;
    onClick?: () => void;
    onPress?: () => void;
}
export default function Image({ src, alt, width = '100%', height = '100%', className = '', onClick, onPress }: Props) {
    const handleClick = () => {
        if (typeof onClick === 'function') onClick();
        if (typeof onPress === 'function') onPress();
    }
    return (
        <NextUIImage
            onClick={handleClick}
            loading='eager'
            isBlurred
            src={src}
            alt={alt}
            width={width}
            height={height}
            style={{
                ...(width && { width }),
                ...(height && { height }),
            }}
            className={className}
        />
    )
}