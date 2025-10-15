import { Injectable } from "@angular/core";
import { supabase } from "../../supabase.config";

@Injectable({
  providedIn: "root",
})
export class SupabaseService {
  async getUsers() {
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      console.error("Erro ao buscar usuários:", error);
      return [];
    }
    return data;
  }

  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Erro no login:", error);
      return null;
    }
    return data.session?.access_token; // JWT
  }
}
