import CopyRights from "../../Shared/CopyRights/CopyRights";
import FollowUs from "../../Shared/FollowUs/FollowUs";
import "./Footer.css";

function Footer(): JSX.Element {
    return (
        <div className="Footer">
            <CopyRights/>
            <FollowUs/>
        </div>
    );
}

export default Footer;
