import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticated, setCurrentPage } from '../redux/actions';

export default function Nav() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const logout = () => {
    localStorage.clear();
    dispatch(setAuthenticated(false));
  };
  return (
    <nav className="bg-opacity-60 bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-12 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* Uncomment the logo section if needed */}
            {/* <div className="flex flex-shrink-0 items-center">
              <img className="h-8 w-auto" src="../static/assets/logo.png" alt="Your Company">
            </div> */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <button onClick={() => {
                  dispatch(setCurrentPage('HomePage'));
                }} className="Rastaglion text-white font-bold text-2xl">
                  Railway Yatra
                </button>
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="hidden sm:ml-6 sm:block">
              {isAuthenticated ? (
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      dispatch(setCurrentPage('MyBookings'))
                    }}
                    className="rounded-md px-3 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  > My Bookings
                  </button>
                  <button
                    onClick={() => {
                      dispatch(setCurrentPage('HomePage'))
                    }}
                    className="rounded-md px-3 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Book Tickets
                  </button>
                  <button
                    onClick={() => {
                      dispatch(setCurrentPage('PNR'))
                    }}
                    className="rounded-md px-3 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    PNR Status
                  </button>
                  <div className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                    <button>
                      <button
                        onClick={() => {
                          logout()
                        }}
                        type="submit"
                        className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        Sign Out
                      </button>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      dispatch(setCurrentPage('LoginPage'))
                    }}
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      dispatch(setCurrentPage('RegisterPage'))
                    }}
                    className="text-white bg-blue-700 hover:bg-blue-800 rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <a
            href="#"
            className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
            aria-current="page"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Team
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Projects
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Calendar
          </a>
        </div>
      </div>
    </nav >
  );
}
