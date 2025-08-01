import { useState, useEffect } from "react";
import { Logo_QuoteHub } from "../assets/images";
import { navLinks } from "../constants/index";
function Nav() {
  const [active, setActive] = useState(() => localStorage.getItem("activeNav") || null);

  useEffect(() => {
    if (active) {
      localStorage.setItem("activeNav", active);
    }
  }, [active]);

  return (
    <header className="px-5 w-full h-[80px] bg-slate-800 shadow-md">
      <nav className="flex items-center h-full justify-evenly">
        {/* Logo on the left */}
        <div className="flex items-center w-1/3 justify-start">
          <a href="/">
            <img
              src={Logo_QuoteHub}
              alt="Header Logo"
              width={105}
              height={50}
              className="m-15 cursor-pointer"
            />
          </a>
        </div>
        {/* Nav links centered */}
        <ul className="flex justify-center items-center gap-16 w-1/3">
          {navLinks.map((items) => (
            <li key={items.label}>
              <a
                href={items.href}
                className={`font-montserrat loading-normal text-lg ${
                  active === items.label
                    ? "text-red-400"
                    : "text-white hover:text-red-300"
                }`}
                onClick={() => setActive(items.label)}
              >
                {items.label}
              </a>
            </li>
          ))}
        </ul>
        {/* Empty div to balance flex for centering */}
        <div className="w-1/3" />
      </nav>
    </header>
  );
}

export default Nav;
