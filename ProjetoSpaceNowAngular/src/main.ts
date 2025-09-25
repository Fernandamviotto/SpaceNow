import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";
import { AppComponent } from "./app/app.component";
import { HomeComponent } from "./app/components/home/home.component";
import { LoginComponent } from "./app/components/login/login.component";

const routes = [
  { path: "", component: LoginComponent }, 
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent }, 
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient()],
}).catch((err) => console.error(err));
