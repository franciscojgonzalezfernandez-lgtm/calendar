import { useAuthStore } from "../../hooks";

export const NavBar = () => {
  const { logout, user } = useAuthStore();
  const userName = user || "User"; // Get from store
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"> {userName}</i>
      </span>
      <button onClick={logout} className="btn btn-outline-danger">
        <i className="fas fa-sign-out-alt"></i>
        <span>Exit</span>
      </button>
    </div>
  );
};
