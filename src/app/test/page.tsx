"use client"
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface times {
    started: number,
    length: number
}

export default function Test() {
    const [counter, setCounter] = useState<number[]>([10, 20, 30, 40]);

    useEffect(() => {
        const timer = setTimeout(() => {
            let newCounter: number[] = [...counter];
            for (let i = 0; i < newCounter.length; i++) {
                newCounter[i]--;
            }
            setCounter(newCounter);
        }, 1000);

        return () => clearTimeout(timer);
    }, [counter]);

    const formatTime = (seconds: number): string => {
        return format(new Date(seconds * 1000), 'mm:ss');
    };

    return (
        <>
            {counter.map((item, index) => (
                <div key={index}>
                    {formatTime(item)}
                </div>
            ))}
        </>
    );
}
