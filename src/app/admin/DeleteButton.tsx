"use client"
import { useRouter } from "next/navigation";
import { deleteUser } from "./fetch";
import React from 'react'
interface deleteButtonProps { userid: string }
export function DeleteButton({ userid }: deleteButtonProps) {
    const router = useRouter()
    return (
        <button onClick={() => {
            deleteUser(userid)
            router.refresh()
        }} className="btn btn-error text-white rounded-lg">Delete</button>
    )
}
