import { NAV_LINKS } from "../../utils/constants";

function Navbar() {
  return (
    <header>
      <nav>
        <div>Logo</div>

        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.label}>{link.label}</li>
          ))}
        </ul>

        <div>Actions</div>
      </nav>
    </header>
  );
}

export default Navbar;
