import { mockApi } from "./mockApi";

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
  };
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

// Mock authentication service
export const authService = {
  // Simulate a login request
  login: async (email: string): Promise<LoginResponse> => {
    // Simulate API delay
    return mockApi<LoginResponse>(
      {
        token: "mock-jwt-token-xyz123",
        user: {
          id: "1",
          name: "Demo User",
          email: email,
          role: "admin",
          avatar: "https://randomuser.me/api/portraits/men/24.jpg",
        },
      },
      1000
    );
  },

  // Get current user based on token
  getCurrentUser: async (): Promise<User> => {
    // Simulate API delay
    return mockApi<User>(
      {
        id: "1",
        name: "Demo User",
        email: "admin@example.com",
        role: "admin",
        avatar: "https://randomuser.me/api/portraits/men/24.jpg",
      },
      500
    );
  },
};
