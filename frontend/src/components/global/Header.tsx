import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="centered-layout">
        <div className="content-container header-content">
          <img
            src="/chomchom_logo.png"
            alt="Chomchom logo"
            className="header-logo"
            onClick={() => navigate("/")}
          />
          <span className="header-tagline">A simple pet management system</span>
        </div>
      </div>
    </header>
  );
}
