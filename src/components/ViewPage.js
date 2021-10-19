import PropTypes from "prop-types";
import React from "react";
import ViewContent from "./ViewContent";

const ViewPage = ({ match }) => {
  const id = match.params.id;
  return (
    <>
      <div className="container">
        <ViewContent id={id} />
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  );
};

ViewPage.propTypes = {
  match: PropTypes.object,
};

export default ViewPage;
