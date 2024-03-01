"use client";
import { useState, useEffect } from 'react';
import { format, differenceInSeconds, subSeconds } from 'date-fns';

interface times {
    started: Date,
    length: number
}

export default function AuctionProducts(props: any) {
    const products = props.data;
    const [counter, setCounter] = useState<number[]>([]);

    useEffect(() => {
        const newTimestamps: number[] = products.map((time: any) => {
            const currentDate = new Date();
            const difference = differenceInSeconds(currentDate, time.updatedAt);
            return Math.max(difference, 0); // Ensure the difference is not negative
        });

        setCounter(newTimestamps);
    }, [products]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCounter(prevCounter => prevCounter.map(item => Math.max(item - 1, 0)));
        }, 1000);

        return () => clearTimeout(timer);
    }, [counter]);

    const formatTime = (seconds: number): string => {
        const date = subSeconds(new Date(0), seconds);
        return format(date, "d'd' H'h' m'm' s's'");
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
