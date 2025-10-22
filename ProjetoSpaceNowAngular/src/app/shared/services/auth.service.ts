import { Injectable } from "@angular/core";
import { supabase } from "../../supabase.config";

@Injectable({
  providedIn: "root",
})
export class AuthService {
 
  async login(email: string, password: string): Promise<string | null> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      console.error("Erro no login:", error);
      return null;
    }

    localStorage.setItem("ps_auth_token", data.session.access_token);
    localStorage.setItem("ps_user_email", email);

    return data.session.access_token;
  }

  async signup(email: string, password: string): Promise<boolean> {
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error("Erro no signup:", error);
      return false;
    }

    return true;
  }

  async logout(): Promise<void> {
    await supabase.auth.signOut();
    localStorage.removeItem("ps_auth_token");
    localStorage.removeItem("ps_user_email");
  }

  getToken(): string | null {
    return localStorage.getItem("ps_auth_token");
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("ps_auth_token");
  }
}
