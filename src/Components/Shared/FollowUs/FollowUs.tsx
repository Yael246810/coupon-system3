import "./FollowUs.css";
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";

function FollowUs(): JSX.Element {
  return (
    <div className="FollowUs">
      <a href="https://www.linkedin.com/in/yael-cohen-2418b8251/">
        <FaLinkedin size={25} />
      </a>
      <a href="https://github.com/Yael246810">
        <FaGithubSquare size={25} />
      </a>
      <h3>Follow Us</h3>
    </div>
  );
}

export default FollowUs;
