import "./Video.css";

function Video(): JSX.Element {
    return (
        <div className="Video">
            <h1>Coupon Song</h1>
			<iframe width="400" height="235" 
            src="https://www.youtube.com/embed/ZTmHNxHc30A" 
            title="YouTube video player" frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
            gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
    );
}

export default Video;
