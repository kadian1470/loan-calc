import { useMutation } from "@tanstack/react-query";
import { PageableResults } from "./types";
import { invalidateUsers } from "./useUsers";

type UserCreateRequest = Readonly<{
  id: string;
  name: string;
}>;

export default function useCreateUser() {
  return useMutation({
    mutationFn: async (request: UserCreateRequest) => {
      const knownUsers = localStorage.getItem("users");
      let userSet = [request];
      if (knownUsers) {
        try {
          const savedUsers: PageableResults<UserCreateRequest> =
            JSON.parse(knownUsers);
          // Could be smarter but right now just remove the one that matches the create and replace based on id.
          userSet = [
            ...savedUsers.results.filter((u) => u.id !== request.id),
            request,
          ];
        } catch {
          console.warn("Failed to parse users.");
        }
      }
      localStorage.setItem(
        "users",
        JSON.stringify({
          total: userSet.length,
          page: 1,
          results: userSet,
        })
      );
    },
    onSuccess: () => {
      invalidateUsers();
    },
  });
}
