import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import ErrorMessage from "../errorMessage/ErrorMessage";

const Page404: React.FC = () => {
  return (
    <div>
      <Helmet>
        <meta name="description" content="404 page" />
        <title>404 page</title>
      </Helmet>
      <ErrorMessage />
      <p
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "30px",
          marginTop: "50px",
        }}
      >
        Page doesn't exist
      </p>
      <Link
        style={{
          display: "block",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "24px",
          marginTop: "60px",
          color: "#9F0013",
        }}
        to="/"
      >
        Back to main page
      </Link>
    </div>
  );
};

export default Page404;
