import "./navbar.css";
export default function Navbar(props) {
    return (
        <nav className="navbar">
            <a className="active" href="#"> React Canvas Editor</a>
            {props.children}
        </nav>
    );
}
