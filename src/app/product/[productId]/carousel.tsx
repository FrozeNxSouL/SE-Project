"use client"
import { useState } from "react"

export default function ProductCarousel(props: any) {
    const images = props.data.imageUrl

    const [currentImage, setCurrentImage] = useState(images[0]);

    const handleHover = (order: number)=> {
        setCurrentImage(images[order]);
    }

    return (
        <div className="flex flex-col w-96 items-center">
            <div>
                <img className="rounded-lg object-cover w-96 h-96" src={currentImage}/>
            </div>
            <div className="flex flex-row justify-center items-center mt-2">
                {images.map((item: any, index: number)=> (
                    <div key={index} className="min-w-20 min-h-20 w-20 h-20 cursor-pointer hover:outline hover:outline-primary" onMouseEnter={() => {handleHover(index)}}>
                        <img className="object-cover size-full" src={item} alt={item.label}/>
                    </div>
                ))}
            </div>
        </div>
    )
}