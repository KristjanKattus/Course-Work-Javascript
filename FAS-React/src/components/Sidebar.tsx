import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                <div className="sidebar-brand-text mx-3">FAS</div>
            </NavLink>

            <hr className="sidebar-divider" />

            <li className="nav-item">
                <div className="nav-link collapsed"  data-toggle="collapse" data-target="#collapseMenLeagues" aria-expanded="true" aria-controls="collapseMenLeagues">
                    <i className="fas fa-fw fa-cog"></i>
                    <span>Men leagues</span>
                </div>
                <div id="collapseMenLeagues" className="collapse" aria-labelledby="collapseMenLeagues" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" to="/LeagueTable/1AF2336C-8A54-4A4C-0CEA-08D922301FB4">
                            <div className="collapse-item">Premier league</div>
                        </NavLink>
                    </div>
                </div>
            </li>
        </ul>
    );
}

export default Sidebar;
