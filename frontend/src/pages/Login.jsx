import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signedInMessage, setSignedInMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent to the server
    const data = { email, password };

    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      // Send the data to the server
      const response = await fetch(`${apiUrl}/login}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        console.log({ email, password });
        setSignedInMessage(result.message);
        setError(""); // Clear any previous errors
      } else {
        console.log(result);
        setError(result.message);
        setSignedInMessage(""); // Clear success message
      }
    } catch (err) {
      console.error("Error occurred:", err);
      setError("An error occurred while trying to sign in.");
      setSignedInMessage(""); // Clear success message
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {signedInMessage && <p style={{ color: "green" }}>{signedInMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
