import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ErrorPageComponent } from "../error-page/error-page.component";
import { HomeComponent } from "../home/home.component";

import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { EditServerComponent } from "../servers/edit-server/edit-server.component";
import { ServerComponent } from "../servers/server/server.component";
import { ServersComponent } from "../servers/servers.component";
import { AuthGuardService } from "../services/auth-guard.service";
import { CanDeactivateGuardService } from "../services/can-deactivate-guard.service";
import { ServerResolverService } from "../services/server-resolver.service";
import { UserComponent } from "../users/user/user.component";
import { UsersComponent } from "../users/users.component";

const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "users",
    component: UsersComponent,
    children: [
      {
        path: ":id/:name",
        component: UserComponent,
      },
    ],
  },

  {
    path: "servers",
    // canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    component: ServersComponent,
    children: [
      {
        path: ":id",
        component: ServerComponent,
        resolve: { server: ServerResolverService },
      },
      {
        path: ":id/edit",
        component: EditServerComponent,
        canDeactivate: [CanDeactivateGuardService],
      },
    ],
  },
  // {
  //   path: "not-found",
  //   component: PageNotFoundComponent,
  // },

  {
    path: "not-found",
    component: ErrorPageComponent,
    data: { message: "Page Not Found!" },
  },
  // wildcard route
  {
    path: "**",
    redirectTo: "/not-found",
  },
];

@NgModule({
  // imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
