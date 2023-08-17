import { defineStore } from "pinia";
import { reactive } from "vue";

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  id: string;
  user_meta: Record<string, any>;
  created_at: Date;
  verified_at?: Date;
  updated_at?: Date;
  roles?: string[];
}

export const useAuthStore = defineStore("authStore", () => {
  const auth = reactive<{ is_authenticated: boolean; user?: User }>({
    is_authenticated: false,
    user: undefined,
  });

  return { auth };
});
