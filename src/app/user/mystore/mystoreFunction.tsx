"use client";

import { Product } from "@prisma/client";
import { useState } from "react";
import { changeProduct, deleteProduct } from "./fetch";
import { useRouter } from "next/navigation";

export function EditButton(props: any) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const router = useRouter();
  const [product, setProduct] = useState<Product>(props.data);

  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);

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
  const handleChanging = () => {
    changeProduct(product.id, name, description, price);
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
        <div className="modal-middle space-y-2">
          <div>
            {product.imageUrl.map((imageUrl, index) => (
              <img
                key={index} // You should use a unique key for each element when rendering a list
                className="object-cover w-full max-h-60"
                src={imageUrl}
                alt={`Image ${index}`} // Optionally, provide alt text for each image
              />
            ))}
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
              Image URL
              <input type="text" className="grow bg-transparent" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Price
              <input
                type="text"
                className="grow bg-transparent"
                value={price}
                onChange={handlePriceChange}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Category
              <input
                type="text"
                className="grow bg-transparent"
                placeholder="Daisy"
              />
            </label>
          </form>
        </div>
        <div className="modal-action flex flex-row justify-between">
          <div>
            <button className="btn btn-error" onClick={handleToggleDelete}>
              <span className="material-icons">delete_forever</span>
            </button>
          </div>
          <div className="space-x-2">
            <button className="btn btn-success" onClick={handleChanging}>
              Confirm
            </button>
            <button className="btn btn-error" onClick={handleToggle}>
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
          <button className="btn btn-error" onClick={handleToggleDelete}>
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
