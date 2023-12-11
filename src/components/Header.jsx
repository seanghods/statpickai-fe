import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <div className="mx-8 my-3 rounded-lg px-10 py-2 bg-black bg-opacity-50 flex justify-between items-center text-xl tracking-wider">
      <NavLink
        to="/"
        className="hover:scale-105 transform transition duration-250 h-full font-saira_bold text-white"
      >
        STAT <span className="text-[#4DE234]">PICK</span> AI
      </NavLink>
      <div className="flex gap-6 font-saira items-center">
        <NavLink
          to="/"
          className="hover:scale-105 transform transition duration-250 font-saira_bold text-white"
        >
          HOME
        </NavLink>
        <NavLink
          className="hover:scale-105 transform transition duration-250 font-saira_bold text-white"
          to="/games"
        >
          GAMES
        </NavLink>
        <NavLink
          className="hover:scale-105 transform transition duration-250 font-saira_bold text-white"
          to="/pricing"
        >
          PRICING
        </NavLink>
        <NavLink
          className="hover:scale-105 transform transition duration-250 font-saira_bold text-white"
          to="/about"
        >
          ABOUT
        </NavLink>
        <NavLink
          to="/sign-up"
          className="bg-[#4DE234] rounded-lg px-1 py-0.5 hover:scale-105 transform transition duration-250 font-saira_bold text-white"
        >
          SIGN-UP
        </NavLink>
      </div>
    </div>
  );
}
