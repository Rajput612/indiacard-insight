
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, AuthState } from "@/types/user";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  updateOwnedCards: (cardIds: string[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Load user data from localStorage on initial render
  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error("Error loading user from localStorage:", error);
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    loadUserFromStorage();
  }, []);

  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Check if user exists in localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u: any) => u.email === email);

      if (!user) {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return false;
      }

      // In a real app, we would hash passwords. Here we simply compare them
      if (user.password !== password) {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return false;
      }

      // Extract user data (exclude password)
      const { password: _, ...userData } = user;

      // Store the user in localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // Update state
      setAuthState({
        user: userData,
        isAuthenticated: true,
        isLoading: false,
      });

      toast({
        title: "Login successful",
        description: `Welcome back, ${userData.name}!`,
      });

      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  // Mock register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const existingUser = users.find((u: any) => u.email === email);

      if (existingUser) {
        toast({
          title: "Registration failed",
          description: "Email already in use",
          variant: "destructive",
        });
        return false;
      }

      // Create new user
      const newUser = {
        id: uuidv4(),
        name,
        email,
        password, // In a real app, this would be hashed
        ownedCards: [],
      };

      // Add user to users array
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Extract user data (exclude password)
      const { password: _, ...userData } = newUser;

      // Log user in after registration
      localStorage.setItem("user", JSON.stringify(userData));

      // Update state
      setAuthState({
        user: userData,
        isAuthenticated: true,
        isLoading: false,
      });

      toast({
        title: "Registration successful",
        description: `Welcome to IndiaCardInsight, ${name}!`,
      });

      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  // Update profile function
  const updateProfile = (userData: Partial<User>) => {
    if (!authState.user) return;

    try {
      const updatedUser = { ...authState.user, ...userData };
      
      // Update in localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      // Update users array
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((u: any) => 
        u.id === updatedUser.id ? { ...u, ...userData } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      
      // Update state
      setAuthState({
        ...authState,
        user: updatedUser,
      });
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated",
      });
    } catch (error) {
      console.error("Update profile error:", error);
      toast({
        title: "Update failed",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  // Update owned cards
  const updateOwnedCards = (cardIds: string[]) => {
    if (!authState.user) return;
    
    updateProfile({ ownedCards: cardIds });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        updateProfile,
        updateOwnedCards,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
