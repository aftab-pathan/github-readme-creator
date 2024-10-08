export const DownloadModal = ({ setShowModal }) => {
  <>
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={() => setShowModal(false)}
        >
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          ></span>

          <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 ob-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
            <div>
              <p className="text-7xl text-center">!!</p>
              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Readme Generated!
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Thanks for using this! Feel free to reach out to me on{" "}
                    <a
                      href="https://twitter.com/kuluruvineeth"
                      target="__blank"
                      className="text-green-500 hover:text-green-400"
                    >
                      Twitter
                    </a>{" "}
                    with any feedback.
                  </p>
                  <p className="text-sm text-gray-500 mt-3">
                    If you found this product helpful, consider supporting me
                    with a cup of coffee!
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 mx-auto flex justify-center">
              <a></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>;
};
