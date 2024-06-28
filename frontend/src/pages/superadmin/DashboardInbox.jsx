import { useState } from "react";
import { useGlobal } from "../../contexts/GlobalContext";
import { FaPlus as Plus } from "react-icons/fa";
import { MdEmail as Email } from "react-icons/md";

export default () => {
  const { messages, loading } = useGlobal();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleMessage = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleDateString("en-US");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-4xl font-semibold">Your Messages</h2>
        <div>You have {messages ? messages.length : 0} messages</div>{" "}
        {/* Ensure messages is not undefined */}
      </div>

      <ul className="gap-4 text-xl grid grid-cols-1">
        {loading ? (
          <li className="p-4 shadow-xl border border-neutral-800 flex justify-between items-center col-span-1">
            Loading...
          </li>
        ) : (
          <>
            {messages && messages.length > 0 ? (
              messages.map((m, i) => (
                <li
                  key={`message.${i}`}
                  className="p-4 shadow-xl border border-neutral-800 col-span-1"
                >
                  <div className="flex w-full justify-between items-center">
                    <div>{m.email}</div>
                    <div className=" flex justify-center items-center gap-10">
                      {formatCreatedAt(m.createdAt)}{" "}
                      <a href={`mailto:${m.email}`}>
                        <Email />
                      </a>
                      <button
                        className="text-sky-400"
                        onClick={() => toggleMessage(i)}
                      >
                        <Plus />
                      </button>
                    </div>
                  </div>

                  {openIndex === i && (
                    <p className="border-t mt-4 pt-4 border-neutral-800">
                      {m.message}
                    </p>
                  )}
                </li>
              ))
            ) : (
              <li className="p-4 shadow-xl border border-neutral-800 col-span-1">
                No messages found.
              </li>
            )}
          </>
        )}
      </ul>
    </div>
  );
};
