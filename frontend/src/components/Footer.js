import React from "react";

function Footer() {
    return (
        <div className="footer">
            <p className="footer__copyright">&copy;&nbsp;{new Date().getFullYear()} Mesto&nbsp;Russia</p>
        </div>
    )
}

export default Footer;