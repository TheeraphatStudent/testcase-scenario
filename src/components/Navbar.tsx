import { useState, useEffect } from "react";
import { DEFAULT_IMAGE } from "../config/environment"
import { removeSessionItem, getSessionItem } from "../utils/useSession"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../hooks/useTheme"

export const Navbar = () => {
  const [profileImage, setProfileImage] = useState<string>(DEFAULT_IMAGE);
  const navigate = useNavigate();
  const { currentTheme, changeTheme } = useTheme();

  const loggedOut = () => {
    removeSessionItem({ name: 'user' })
    removeSessionItem({ name: 'credential' })
    navigate('/login')
  }

  const fetchProfileImage = async () => {
    try {
      const userData = await getSessionItem({ name: 'user' })
      setProfileImage(`${userData.data.photoURL}?export=view`)
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  }

  useEffect(() => {
    fetchProfileImage()
  }, [])

  return (
    <header className={`shadow-sm ${currentTheme === 'yellow' ? 'bg-yellow-100' : currentTheme === 'black' ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="flex justify-between container mx-auto px-4 py-6">
        <div className="flex flex-col">
          <h1 className={`text-xl font-bold ${currentTheme === 'black' ? 'text-white' : 'text-gray-900'}`}>TCM</h1>
          <span className={`text-xs ${currentTheme === 'black' ? 'text-gray-300' : 'text-gray-600'}`}>An testcase management service</span>
        </div>
        <div className="flex gap-5 max-h-[44px] items-center">
          <img
            className="block w-[44px] h-[44px] rounded-full"
            src={profileImage}
            alt="Profile"
            width={44}
            height={44}
          />

          {/* Theme control */}
          <div className="flex gap-2">
            <button
              onClick={() => changeTheme('yellow')}
              className={`w-8 h-8 rounded-full bg-yellow-400 ${currentTheme === 'yellow' ? 'ring-2 ring-offset-2 ring-yellow-500' : ''}`}
              aria-label="Yellow theme"
            />
            <button
              onClick={() => changeTheme('white')}
              className={`w-8 h-8 rounded-full bg-white border ${currentTheme === 'white' ? 'ring-2 ring-offset-2 ring-gray-300' : ''}`}
              aria-label="White theme"
            />
            <button
              onClick={() => changeTheme('black')}
              className={`w-8 h-8 rounded-full bg-gray-900 ${currentTheme === 'black' ? 'ring-2 ring-offset-2 ring-gray-700' : ''}`}
              aria-label="Black theme"
            />
          </div>

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