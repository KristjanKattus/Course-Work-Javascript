import { Link } from "react-router-dom";

const Footer = () => (
    <footer className="footer bg-dark text-center text-lg-start text-light">
        <div className="container">
            &copy; 2021 - Brainz -
            <Link className="text-info" to="/Privacy"> Privacy</Link>
        </div>
    </footer>
)

export default Footer;