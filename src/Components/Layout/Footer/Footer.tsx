import { Link } from "react-router-dom";
import CopyRights from "../../Shared/CopyRights/CopyRights";
import FollowUs from "../../Shared/FollowUs/FollowUs";
import "./Footer.css";

function Footer(): JSX.Element {
    // to add the copy rights
    return (
        <div className="Footer">
            {/* <CopyRights/> */} 
            <FollowUs/>
            {/* <Link to="/contactUs"><button>Contact Us</button></Link> */} 
        </div>
    );
}

export default Footer;
