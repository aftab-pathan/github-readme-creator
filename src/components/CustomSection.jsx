import { useRef, useState } from "react";
import { Dialog, DialogTitle } from "@headlessui/react";
import useLocalStorage from "../hooks/useLocalStorage";

export const CustomSection = ({
  setTemplates,
  setSelectedSectionSlugs,
  setFocusedSectionSlug,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const { saveBackup } = useLocalStorage();

  const inputRef = useRef(null);

  const addCustomSection = () => {
    if (title === "") {
      return;
    }
    setShowModal(false);
    const section = {
      slug: "custom-" + title.toLocaleLowerCase().replace("/s/g", "-"),
      name: title,
      markdown: `
## ${title}`,
    };

    localStorage.setItem("current-focused-slug", section.slug);
    setTemplates((prev) => {
      const newTemplates = [...prev, section];
      saveBackup(newTemplates);
      return newTemplates;
    });
    setSelectedSectionSlugs((prev) => [...prev, section.slug]);
    setFocusedSectionSlug(localStorage.getItem("current-focused-slug"));
    setTitle("");
  };

  return (
    <>
      <Dialog
        open={showModal}
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={inputRef}
        onClose={() => setShowModal(false)}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg lg:w-full sm:p-6">
            <div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  className="text-lg leading-6 font-medium text-gray-900"
                >
                  New Custom Section
                </DialogTitle>
                <div className="my-4">
                  <input
                    ref={inputRef}
                    type="text"
                    name="title"
                    id="title"
                    onChange={(e) => setTitle(e.target.value)}
                    className="shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-green-400 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Section Title"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between align-center">
              <button
                type="button"
                className="w-[40%] rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 sm:col-start-2 sm:text-sm disabled:opacity-50"
                disabled={!title}
                onClick={addCustomSection}
              >
                Add Section
              </button>
              <button
                type="button"
                className="w-[40%] rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 sm:mt-0 sm:col-start-1 sm:text-sm"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Dialog>
      <div className="mb-3">
        <button
          className="flex items-center justify-center block w-full h-full py-2 pl-3 pr-6 bg-white font-bold rounded-md shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
          type="button"
          onClick={() => setShowModal(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-1">Custom Section</span>
        </button>
      </div>
    </>
  );
};
