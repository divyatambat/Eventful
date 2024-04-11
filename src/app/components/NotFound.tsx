import { Result } from "antd";
import { Link } from "react-router-dom";
// import "antd/dist/antd.css";

const NotFound = () => {
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="contents">
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={
                        <Link to="/">
                            <button className="btn btn-primary btn-lg animate__animated animate__pulse animate__infinite animate__slower 1s">
                                HOME
                            </button>
                        </Link>
                    }
                />
                {/* <p className="lead text-muted">
          While you're here, check out some of our most popular features:
        </p>
        <ul className="list-group list-group-flush my-4">
          <li className="list-group-item">Feature 1</li>
          <li className="list-group-item">Feature 2</li>
          <li className="list-group-item">Feature 3</li>
        </ul> */}
            </div>
        </div>
    );
};

export default NotFound;
