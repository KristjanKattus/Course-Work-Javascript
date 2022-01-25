import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                <div className="sidebar-brand-text mx-3">Brainz</div>
            </NavLink>

            <hr className="sidebar-divider" />

            <div className="sidebar-heading">
                General
            </div>
        </ul>
    );
}

export default Sidebar;
