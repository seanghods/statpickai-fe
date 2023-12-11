import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="bg-black w-full h-[200px] flex flex-col items-center justify-center gap-5">
      <div className="font-inter text-gray-300 text-xs mx-24">
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
        </div>
      </div>
    </div>
  );
}
