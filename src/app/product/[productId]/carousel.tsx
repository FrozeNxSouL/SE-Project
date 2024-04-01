"use client"
import { useState } from "react"

export default function ProductCarousel(props: any) {
    const images = props.data.imageUrl

    const [currentImage, setCurrentImage] = useState(images[0]);
    const [scrollPosition, setScroll] = useState(0);
    const scroll = (direction: string)=> {
        const container = document.getElementById('img-slider');

        if (direction === "left") {
            setScroll(scrollPosition - 200);
            container?.scrollBy({
                left: -100,
                behavior: 'smooth',
            })
        } else {
            setScroll(scrollPosition + 200);
            container?.scrollBy({
                left: 100,
                behavior: 'smooth',
            })
        }
    }

    const handleHover = (order: number)=> {
        setCurrentImage(images[order]);
    }

    return (
        <div className="flex flex-col w-96 items-center">
            <div>
                <img className="rounded-lg object-cover w-96 h-96" src={currentImage}/>
            </div>
            <div className="flex flex-row justify-center items-center">
                <button className="btn btn-primary btn-circle" onClick={()=> {scroll("left")}}>
                    <span className="material-icons">arrow_left</span>
                </button>
                <div id="img-slider" className="flex gap-2 mt-2 w-64 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
                    {images.map((item: any, index: number)=> (
                        <div key={index} className="min-w-20 min-h-20 w-20 h-20 cursor-pointer hover:outline hover:outline-primary" onMouseEnter={() => {handleHover(index)}}>
                            <img className="object-cover size-full" src={item} alt={item.label}/>
                        </div>
                    ))}
                </div>

                <button className="btn btn-primary btn-circle" onClick={()=> {scroll("right")}}>
                    <span className="material-icons">arrow_right</span>
                </button>
            </div>
        </div>
    )
}