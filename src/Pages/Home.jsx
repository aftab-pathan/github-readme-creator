import { Link } from "react-router-dom";
import { FlipWords } from "../components/ui/flip-words";

function Home() {
  const words = ["README", "DOCUMENTATION", "GITHUB-PROFILE"];

  return (
    <>
      <div className="h-full w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div>
          <div className="relative overflow-hidden">
            <div
              className="absolute inset-y-0 h-full w-full"
              aria-label="true"
            ></div>
            <div className="relative pt-6 pb-16 sm:pb-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <nav className="relative flex items-center justify-between sm:h-10 md:justify-center">
                  <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                    <div className="flex items-center justify-between w-full md:w-auto">
                      <Link to="/">
                        <div className="flex items-center">
                          <img
                            className="h-8 mt-1 w-auto cursor-pointer"
                            src="readme.svg"
                            alt="logo"
                          />
                          <p className="text-gray-800 ml-2 -mb-2 text-md">
                            readmeCreator
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="relative w-28 items-center flex-1 md:absolute md:inset-y-0 md:right-0 z-10"></div>
                </nav>
              </div>

              <div className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6">
                <div className="text-center">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block">The fastest way to create a</span>
                    <span className="block text-green-600">
                      <FlipWords words={words} className="text-green-600" />
                    </span>
                  </h1>
                  <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                    {`Spend less time formatting and more time on content. Our editor simplifies creating the perfect readme for your project`}
                  </p>
                </div>
                <div className="flex justify-center mt-6">
                  <button className="p-[3px] relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-green-500 rounded-lg" />
                    <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                      <Link to="/editor">Get Started</Link>
                    </div>
                  </button>
                </div>
                <div className="text-center">
                  <p className="mt-3 mx-auto text-sm text-gray-900">
                    100% Free
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex flex-col">
              <div className="flex-1" />
              <div className="flex-1 w-full" />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <img
                className="relative rounded-md shadow-lg"
                src="/readmeCreator.png"
                alt="App Screenshot"
              />
            </div>
          </div>
          <div className="">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
              <h2 className="text-center text-black-400 text-sm font-semibold tracking-wide">
                Made with love &#9825; by{" "}
                <a
                  className="hover:text-green-500"
                  href="https://github.com/aftab-pathan"
                  target="__blank"
                >
                  Aftab Pathan
                </a>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
