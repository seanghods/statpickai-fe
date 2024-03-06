import { NavLink, useNavigate } from 'react-router-dom';
import useResponse from '../context/useResponse';
import { API_ROUTES } from '../utils/constants';
import MenuButtonX from './sub-components/MenuButton';
import logo from '../assets/logo.png';
import LogInButton from './sub-components/LogInButton';
import { capitalize } from '../utils/helpers';
import { DiscordLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import posthog from 'posthog-js';

export default function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useResponse();
  async function handleLogOut() {
    const response = await fetch(API_ROUTES.logOut, {
      withCredentials: true,
      credentials: 'include',
    });

    const data = await response.json();

    if (response.ok && data.success) {
      posthog.reset();
      setUser({ user: '' });
      navigate('/');
    } else {
      console.log(data.message);
    }
  }
  const navUnlogged = [
    { title: 'Games', path: '/games' },
    { title: 'Pricing', path: '/pricing', class: 'hidden md:block' },
    { title: 'About', path: '/about', class: 'hidden md:block' },
  ];

  const navLogged = [
    { title: 'Games', path: '/games' },
    { title: 'Responses', path: '/all-responses', class: 'hidden md:block' },
    {
      title: user.username ? capitalize(user.username) : 'Profile',
      path: '/profile',
      class: 'hidden md:block',
    },
  ];

  return (
    <header className="select-none">
      <div className="md:gap-x-12 items-center max-w-screen-xl mx-auto px-4 flex md:px-8 py-5">
        <div className="flex items-center gap-2">
          <NavLink to={user.username ? '/home' : '/'}>
            <img
              src={logo}
              alt="Stat Pick AI Logo"
              className="h-[50px] md:w-[130px]"
            />
          </NavLink>
          <div className="gap-4 h-full hidden md:flex">
            <a
              href="https://twitter.com/statpickai"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 font-bold hover:text-blue-300 flex items-center justify-center"
            >
              <TwitterLogoIcon className="w-5 h-5" />
            </a>
            <a
              href="https://discord.gg/6EE6G9nC"
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 font-bold hover:text-gray-300 flex items-center justify-center"
            >
              <DiscordLogoIcon className="inline-block w-5 h-5" />
            </a>
          </div>
        </div>
        <ul className="flex-1 gap-1 justify-end items-center flex md:space-x-6 md:space-y-0">
          {user.username ? (
            <>
              <div
                className="text-sm pr-4 md:text-base font-saira_bold text-white"
                to="/all-responses"
              >
                <span className="hidden md:inline-block">
                  TODAY&apos;S PICKS:
                </span>{' '}
                <span
                  className={`${
                    user.picksPerDay - user.picksUsed == 0
                      ? `text-red-200`
                      : 'text-green-200'
                  }`}
                >
                  {user.picksUsed
                    ? user.picksPerDay - user.picksUsed
                    : user.picksPerDay}
                </span>
                /{user.picksPerDay}
              </div>
              {navLogged.map((item, idx) => {
                return (
                  <li
                    key={idx}
                    className="text-sm md:text-base text-gray-300 hover:text-gray-400"
                  >
                    <NavLink to={item.path} className={item.class}>
                      {item.title}
                    </NavLink>
                  </li>
                );
              })}
              <div className="md:hidden">
                <MenuButtonX handleLogOut={handleLogOut} />
              </div>
              <button
                className="hidden md:block transform transition duration-250 text-gray-300 hover:text-gray-400 text-xs md:text-sm"
                onClick={() => handleLogOut()}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              {navUnlogged.map((item, idx) => {
                return (
                  <li
                    key={idx}
                    className="text-sm md:text-base text-gray-300 hover:text-gray-400"
                  >
                    <NavLink to={item.path} className={item.class}>
                      {item.title}
                    </NavLink>
                  </li>
                );
              })}{' '}
              <div className="md:hidden">
                <MenuButtonX handleLogOut={handleLogOut} />
              </div>
              <div className="hidden md:block">
                <LogInButton />
              </div>
              <li>
                <NavLink
                  to="/sign-up"
                  className="flex w-[100px] md:w-auto text-xs items-center justify-center gap-x-0 md:gap-x-1 py-2 px-1 md:px-4 text-white font-medium bg-sky-500 hover:bg-sky-400 active:bg-sky-600 duration-150 rounded-full md:inline-flex"
                >
                  Get started
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      {/* </div> */}
      {/* // </nav> */}
    </header>
  );
}
