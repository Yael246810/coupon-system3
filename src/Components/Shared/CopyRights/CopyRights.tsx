import "./CopyRights.css";

function CopyRights(): JSX.Element {
    const year = new Date().getFullYear();
    return (
        <div className="CopyRights">
			<p>&copy; {year} Coupon System3 All Rights Reserved</p>
            <p>Designed by Yael Cohen</p>
        </div>
    );
}

export default CopyRights;
