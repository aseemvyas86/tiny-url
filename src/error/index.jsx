import React from "react";

const Error = ({ location: { query } }) => {
  const message = query && query.message;

  return (
    <div>
      <h3>An error as occured</h3>
      <div>{message}</div>
    </div>
  );
};

export default Error;
