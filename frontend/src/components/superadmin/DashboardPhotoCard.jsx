import React, { useState } from "react";
import { useGlobal } from "../../contexts/GlobalContext";
import { Link } from "react-router-dom";
import { RiDeleteBinFill as Delete } from "react-icons/ri";
import { IoPencil as Modify } from "react-icons/io5";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Imposta l'elemento radice dell'app per la modale

export default function PhotoCard({
  title,
  image,
  categories,
  user,
  slug,
  deletePhoto,
}) {
  const { baseImgUrl } = useGlobal();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleDelete = () => {
    deletePhoto(slug);
    closeModal();
  };

  return (
    <div className="col-span-1 shadow-2xl flex flex-col">
      {/* Titolo e bottoni */}
      <div className="text-center p-2 text-lg font-semibold flex justify-between items-center">
        <Link to={`/admin/dashboard/update/${slug}`} className="text-sky-400">
          <Modify />
        </Link>
        <h3>{title}</h3>
        <button className="text-red-400" onClick={openModal}>
          <Delete />
        </button>
      </div>

      {/* Immagine */}
      <Link
        to={`/admin/dashboard/${slug}`}
        className="card-dash-img-container block"
      >
        <img
          src={`${baseImgUrl}${image}`}
          alt={`image-${slug}`}
          className="card-dash-img"
        />
      </Link>

      {/* Categories */}
      <ul className="flex flex-wrap gap-2 p-2 justify-center items-center flex-grow">
        {categories.map((c, i) => (
          <li
            key={`cat-${i}`}
            className={`text-neutral-200 bg-neutral-800 px-3 shadow-2xl ${
              i > 2 ? "hidden" : ""
            }`}
          >
            {c.name}
          </li>
        ))}
      </ul>

      <div className="text-center p-2 text-lg font-semibold mt-auto">
        {user.name}
      </div>

      {/* Modale di conferma */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Conferma Eliminazione"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Are you sure?</h2>
        <p>This action is irreversable</p>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleDelete}
            className="text-white bg-red-500 px-4 py-2 rounded"
          >
            Delete
          </button>
          <button
            onClick={closeModal}
            className="text-gray-700 bg-gray-200 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}
