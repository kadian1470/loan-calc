import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../context/QueryClient";
import { PageableResults, UserResponse } from "./types";

const queryKey = "users";

export default function useUsers() {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => {
      const knownUsers = localStorage.getItem("users");
      if (knownUsers) {
        try {
          const parseUsers: PageableResults<UserResponse> =
            JSON.parse(knownUsers);
          return parseUsers;
        } catch {
          console.warn("Failed to load local storage");
        }
      }
      return {
        total: 0,
        page: 1,
        results: [],
      } as PageableResults<UserResponse>;
    },
  });
}

export const invalidateUsers = () => {
  queryClient.invalidateQueries({ queryKey: [queryKey] });
};
