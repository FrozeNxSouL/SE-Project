"use client";

import { Product } from "@prisma/client";
import { useRef, useState } from "react";
import { changeProduct, deleteProduct } from "./fetch";
import { useRouter } from "next/navigation";

export function EditButton(props: any) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const router = useRouter();
  const [product, setProduct] = useState<Product>(props.data);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [images, setImages] = useState<string[]>(product.imageUrl);
  const [imageField, setImageField] = useState<string>("");
  const [tag, setTag] = useState(null);
  const imageFieldRef = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    setShowModal((prev) => !prev);
  };
  const handleToggleDelete = () => {
    setDeleteModal((prev) => !prev);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseFloat(e.target.value) || 0);
  };
  const handleImageURL = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setImageField(e.target.value);
  }

  const handleAddImage = ()=> {
      if (images.length == 5) {
          setError("Cannot upload more than 5 images");
      } else {
          const newImage: string[] = [...images];
          newImage.push(imageField);
          setImages(newImage);
          if (imageFieldRef.current) {
              imageFieldRef.current.value = "";
          }
      }

  }
  const handleRemoveImage = (idx: number)=> {
      const arr: string[] = images.filter((img, index) => index !== idx);
      setImages(arr)
  }

  // productId: string, productName: string, productDesc: string, productPrice: number, imageUrl: string[], productTag: string

  const handleChanging = () => {
    try {
      const res = changeProduct(product.id, name, description, price, images);
    } catch (e: any) {
      setError(e.message);
    }
    handleToggle();
    router.refresh();
  };

  const handleDelete = () => {
    deleteProduct(product.id);
    handleToggleDelete();
    router.refresh();
  };

  return (
    <>
      <div
        className="absolute w-56 h-72 transition opacity-0 hover:opacity-100"
        onClick={handleToggle}
      >
        <span className="material-icons !text-7xl translate-x-20 translate-y-28">
          edit
        </span>
      </div>
      <Modal open={showModal}>
        <div className="modal-top mb-5">
          <h3 className="font-bold text-lg">Edit</h3>
        </div>
        {error && (
            <div role="alert" className="alert mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>{error}</span>
                <div>
                    <button className="btn btn-error btn-sm" onClick={() => { setError(null) }}><span className="material-icons">close</span></button>
                </div>
            </div>
        )}
        <div className="modal-middle space-y-2">
          <div className="flex flex-wrap justify-center gap-3">
            {images.map((image, index) => (
                <div className="size-32 rounded-lg" key={index}>
                    <button className="btn btn-error size-32 opacity-0 hover:opacity-70 absolute active:ring ring-opacity-100 ring-error" onClick={() => handleRemoveImage(index)}>
                        <span className="material-icons">delete</span>
                    </button>
                    <img className="object-cover size-full rounded-lg" src={image} />
                </div>
            ))}
            </div>
            <div className="join w-full">
                <label className="input input-bordered flex items-center gap-2 join-item w-full">
                    Image
                    <kbd className="kbd kbd-sm"><span className="material-icons">link</span></kbd>
                    <input ref={imageFieldRef} name="imageField" className="grow bg-transparent" onChange={handleImageURL} />
                </label>
                <button className="btn btn-primary join-item" onClick={handleAddImage}>Click to add</button>
            </div>

          <form className="space-y-2">
            <label className="input input-bordered flex items-center gap-2">
              Name
              <input
                type="text"
                className="grow bg-transparent"
                value={name}
                onChange={handleNameChange}
              />
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Description"
              value={description}
              onChange={handleDescChange}
            ></textarea>
            <label className="input input-bordered flex items-center gap-2">
              Price
              <input
                type="text"
                className="grow bg-transparent"
                value={price}
                onChange={handlePriceChange}
              />
            </label>
          </form>
          <div className="flex flex-row p-5 gap-5">
              <span className="opacity-50">Delete this product</span>
              <button className="btn btn-error btn-outline btn-sm" onClick={handleToggleDelete}>
                Delete forever
              </button>
          </div>
        </div>
        <div className="modal-action flex flex-row justify-end">
          <div className="space-x-2">
            <button className="btn btn-success" onClick={handleChanging}>
              Confirm
            </button>
            <button className="btn btn-ghost" onClick={handleToggle}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      <Modal open={deleteModal}>
        <div className="modal-top mb-5">
          <h3 className="font-bold text-lg">Delete</h3>
        </div>
        <div className="modal-middle space-y-2">
          <span>Are you sure, you want to delete this product ?</span>
        </div>
        <div className="modal-action">
          <button className="btn btn-success" onClick={handleDelete}>
            Confirm
          </button>
          <button className="btn" onClick={handleToggleDelete}>
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}

export function Modal({
  children,
  open,
}: {
  children: React.ReactNode;
  open: boolean;
}) {
  return (
    <div
      className={`modal modal-bottom sm:modal-middle ${open && "modal-open"}`}
    >
      <div className="modal-box">{children}</div>
    </div>
  );
}
