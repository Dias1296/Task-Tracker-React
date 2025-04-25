const API_URL = "https://localhost:7236/api/auth/";

const register = async (username, password) => {
  //Send a POST request to the register endpoint with username and password
  const response = await fetch(API_URL + "register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }), //Sends the expected UserDTO from the API
  });
  //Returns the response body as JSON. If registration is successful, the response should contain the newly created user.
  return response.json();
};

const login = async (username, password) => {
  //Send a POST request to the login endpoint with credentials.
  const response = await fetch(API_URL + "login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  //Extract the token from the response.
  //const data = await response.json();
  const data = await response.text();
  if (response.ok) {
    //Save the token in localStorage if login is successful.
    localStorage.setItem("token", data);
  }
  return data;
};

const logout = () => {
  //Remove the token on logout.
  localStorage.removeItem("token");
}

//Export the functions as an object for easy import in components.
const AuthService = { register, login, logout };
export default AuthService;