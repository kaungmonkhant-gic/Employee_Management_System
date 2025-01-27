import axios from "axios";

class UserService {
  static BASE_URL = "http://localhost:8081";

  // Login method
  static async login(email, password) {
    try {
      const response = await axios.post(`http://localhost:8081/auth/login`, { email, password });
      return response.data; // Return the response payload from the backend
    } catch (err) {
      throw err; // Rethrow the error for the caller to handle
    }
  }
}

export default UserService;