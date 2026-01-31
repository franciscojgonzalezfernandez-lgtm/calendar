export const NavBar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"> Your Easy Calendar</i>
      </span>
      <button>
        <i className="fas fa-sign-out-alt"></i>
        <span>Exit</span>
      </button>
    </div>
  );
};
