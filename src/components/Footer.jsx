import React from "react";
import footer from "../styles/footer.scss";
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function Footer(){

    const year = new Date().getFullYear();

    return (
        <div className="footer-parent">
            <div className="redes-icons">
                <div className="redes-p">
                   <p>Redes</p> 
                </div>

                <div className="redes-i">
                    <EmailIcon />
                    <InstagramIcon />
                    <WhatsAppIcon />
                </div>
            </div>

            <ul className="footer-list">
                <li>Designed by Juan P. Aguirre</li>
                <li>CopyRight @{year}</li>
            </ul>

            <div className="cookies-part">
                <p>Cookies y derechos</p>
            </div>
        </div>
    )
}

export default Footer;