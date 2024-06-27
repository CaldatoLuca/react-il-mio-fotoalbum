import { useState } from "react"; // Import useState for managing state
import { usePhotos } from "../../contexts/PhotosContext";
import { RiDeleteBinFill as Delete } from "react-icons/ri";
import instance from "../../utils/axiosClient";

export default () => {
  const { categories, fetchCategory } = usePhotos();
  const [newCategory, setNewCategory] = useState("");

  const deleteCategory = async (id) => {
    try {
      await instance.delete(`/categories/${id}`);
      fetchCategory();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleAddCategory = async () => {
    try {
      if (newCategory.trim() === "") return;
      await instance.post("/categories", { name: newCategory });
      setNewCategory("");
      fetchCategory();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div>
      <h2 className="text-4xl font-semibold mb-12">Your Categories</h2>
      <div className="mb-4">
        <div className="flex">
          <input
            type="text"
            placeholder="Add Category..."
            className="w-full p-2 border border-gray-400 rounded"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button
            className="ml-2 px-4 py-2 bg-sky-400 text-white rounded"
            onClick={handleAddCategory}
          >
            Add
          </button>
        </div>
      </div>

      <ul className="gap-4 text-xl grid grid-cols-2">
        {categories.map((c, i) => (
          <li
            key={`cat.${i}`}
            className="p-4 shadow-xl border border-neutral-800 flex justify-between items-center col-span-1"
          >
            <div>{c.name}</div>

            <div>
              <button
                className="text-red-400"
                onClick={() => deleteCategory(c.id)}
              >
                <Delete />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
