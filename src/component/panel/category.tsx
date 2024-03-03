"use client"
import { categories } from "../variables"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Category() {
    const router = useRouter();
    const [scrollPosition, setScroll] = useState(0);
    const scroll = (direction: string)=> {
        const container = document.getElementById('cat-slider');

        if (direction === "left") {
            setScroll(scrollPosition - 200);
            container?.scrollBy({
                left: -200,
                behavior: 'smooth',
            })
        } else {
            setScroll(scrollPosition + 200);
            container?.scrollBy({
                left: 200,
                behavior: 'smooth',
            })
        }
    }

    return (
    <>
        <div>
            <div className="flex justify-center gap-4 items-center mt-10">
                <button className="btn btn-outline btn-primary btn-circle" onClick={()=> {scroll("left")}}>
                    <span className="material-icons">arrow_left</span>
                </button>
                <div id="cat-slider" className='flex flew-row flex-nowrap cursor-grab overflow-scroll gap-2 max-w-4xl [&::-webkit-scrollbar]:hidden'>
                    {categories.map((cat, idx) => (
                    <div onClick = {()=>router.push(`/${cat.label}`)}  className="flex flex-col btn btn-outline join-item w-24 h-24" key={idx}>
                        <span className="material-icons">{cat.icon}</span>
                        <span>{cat.label}</span>
                    </div>
                    ))}
                </div>
                <button className="btn btn-outline btn-primary btn-circle" onClick={()=> {scroll("right")}}>
                    <span className="material-icons">arrow_right</span>
                </button>
            </div>
        </div>
    </>
    )
}