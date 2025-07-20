import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <img
        src="https://i.imgur.com/1isMEWh.png"
        alt="Chomchom logo"
        className="header-logo"
        onClick={() => navigate("/")}
      />
    </header>
  );
}
