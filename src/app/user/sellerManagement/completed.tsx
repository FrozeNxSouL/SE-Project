

export default function Completed(props: any) {
    const output = props.data

    return (
        <div className="flex flex-col items-start">
            {output.map((item: any, index: number) => (
                <div key={index} className="card card-side bg-accent-content shadow-xl w-11/12 h-44 my-3 mx-auto">
                    <figure><img src={item.imageUrl} className="size-44" /></figure>
                    <div className="flex flex-row w-full">
                        <div className="card-body w-2/6">
                            <h2 className="card-title">{item.name}</h2>
                            <p className="text-sm">To User ID {item.Transaction.userId}</p>
                        </div>
                        <div className="card-body w-3/6">
                            <h2 className="card-title text-md">Address</h2>
                            <p className="text-sm">{item.Transaction.address.line1}</p>
                            <p className="text-sm">{item.Transaction.address.city} {item.Transaction.address.state} {item.Transaction.address.postal_code}</p>
                            <p className="text-sm">{item.Transaction.address.country}</p>
                        </div>
                        <div className="flex justify-center items-center w-1/6">
                            <button className="text-lg w-2/3">Completed</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

