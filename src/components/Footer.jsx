import { DiscordLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <div className=" w-full h-[200px] flex flex-col items-center justify-center gap-5">
      <div className="mx-3 max-w-screen-xl font-inter text-gray-300 text-[8px] md:text-xs">
        *While we do our best to offer good advice & information we cannot be
        held responsible for any loss that may be be incurred as a result of
        gambling. We do our best to ensure all the information that we provide
        on this site is correct. However from time to time mistakes will be made
        and we will not be held liable. Please check any stats or information if
        you are unsure how accurate they are. No guarantees are made with
        regards to results or financial gain. All forms of betting carry
        financial risk and it is down to the individual to make bets with or
        without the assistance of information provided on this site.
      </div>
      <div>
        <div className="flex font-inter text-gray-300 text-sm gap-5">
          <NavLink className="hover:text-gray-200" to="/privacy-policy">
            Privacy Policy
          </NavLink>
          <NavLink className="hover:text-gray-200" to="/terms-of-service">
            Terms of Service
          </NavLink>
          <NavLink className="hover:text-gray-200" to="/contact-us">
            Contact Us
          </NavLink>
        </div>
        <div className="flex font-inter text-gray-300 text-sm gap-5 justify-center mt-3">
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
    </div>
  );
}
