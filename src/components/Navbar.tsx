import { DEFAULT_IMAGE, PROFILE_IMAGE } from "../config/environment"
import { removeSessionItem } from "../utils/useSession"

export const Navbar = () => {

  const loggedOut = () => {
    removeSessionItem({ name: 'user' })
    removeSessionItem({ name: 'credential' })

  }

  return (
    <header className="bg-white shadow-sm">
      <div className="flex justify-between container mx-auto px-4 py-6">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-gray-900">TCM</h1>
          <span className="text-xs">An testcase management service</span>
        </div>
        <div className="flex gap-5 max-h-[44px]">
          <img className="block w-[44px] h-[44px] rounded-full" src={`${PROFILE_IMAGE || DEFAULT_IMAGE}`} alt="Profile" width={44} height={44} />

          <button onClick={loggedOut} className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-orange-500 dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent hover:text-white">
              Logout
            </span>
          </button>
        </div>
      </div>
    </header>
  )

}