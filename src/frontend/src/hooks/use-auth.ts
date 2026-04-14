import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";

export type UserRole = "owner" | "customer" | null;

export function useAuth() {
  const {
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
    loginStatus,
  } = useInternetIdentity();
  const queryClient = useQueryClient();

  const handleLogin = () => {
    login();
  };

  const handleLogout = () => {
    clear();
    queryClient.clear();
  };

  const principalId = identity?.getPrincipal().toString() ?? null;

  return {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    loginStatus,
    identity,
    principalId,
    login: handleLogin,
    logout: handleLogout,
  };
}
