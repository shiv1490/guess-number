import React, { useState } from "react";

const Password = () => {
  const [userAttempt] = useState(["1212"]);
  return (
    <>
      <div>Hint</div>
      <div>This is hint value</div>

      {userAttempt.map((attempt) => (
        <div>{attempt}</div>
      ))}

      <input type="text" maxlength="8"></input>
      <button type="submit" value="submit">
        Submit
      </button>
    </>
  );
};

export default Password;
