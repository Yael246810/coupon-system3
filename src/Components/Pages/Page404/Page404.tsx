import "./Page404.css";
import pageNotFound from "../../../assets/Images/page not found.jpg";

function Page404(): JSX.Element {
  return (
    <div className="Page404">
      <h1>PAGE NOT FOUND</h1>
      <h2>Sorry, the page not found</h2>
      <p>The link you followed probably broken or the page has been removed.</p>
      <img src={pageNotFound} alt="page not found 404" />
    </div>
  );
}

export default Page404;
