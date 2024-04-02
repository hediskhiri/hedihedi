import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import { LoginComponent } from './FrontOffice/login/login.component';
import { RegisterComponent } from './FrontOffice/register/register.component';
import { ForbiddenComponent } from './FrontOffice/forbidden/forbidden.component';
import { AuthGuard } from './serives/Auths-Last/auth.guard';
import { UserComponent } from './FrontOffice/user/user.component';
import { StatsComponent } from './BackOffice/stats/stats.component';
import { AllTempleteFrontComponent } from './FrontOffice/all-templete-front/all-templete-front.component';
import { AfiicheevennementfrontComponent } from './FrontOffice/afiicheevennementfront/afiicheevennementfront.component';
import { MapComponent } from './FrontOffice/shared/map/map.component';
import { calendarComponent } from './FrontOffice/shared/calendar/calendar.component';
import { EventDetailsComponent } from './FrontOffice/event-details/event-details.component';
import { AjouterCommentaireComponent } from './FrontOffice/ajoutercommentaire/ajoutercommentaire.component';
import { ModifierevennementComponent } from './BackOffice/modifierevennement/modifierevennement.component';
import { ListeEvennementComponent } from './BackOffice/liste-evennement/liste-evennement.component';
import { AjouterevennementComponent } from './BackOffice/ajouterevennement/ajouterevennement.component';

const routes: Routes = [
  {
    path: 'forbiden',
    component: ForbiddenComponent,
  },
  {
    path: '',
    component: AllTempleteFrontComponent,
    children: [
      {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard],
        data: { roles: ['USER'] },
      },
      {
        path: 'ajoutercommentaire',
        component: AjouterCommentaireComponent,
      },
      {
        path: 'afficherevennementfront',
        component: AfiicheevennementfrontComponent,
      },
      {
        path: 'map',
        component: MapComponent,
      },
      { path: 'calendar', component: calendarComponent },

      { path: 'event/:id', component: EventDetailsComponent },

      { path: 'ajoutercommentaire', component: AjouterCommentaireComponent },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },

  {
    path: 'admin',
    component: AllTemplateBackComponent, // canActivate:[AuthGuard],data:{roles:['ADMIN']},
    children: [
      {
        path: 'listeEvennement',
        component: ListeEvennementComponent,
      },
      {
        path: 'ajouterevennement',
        component: AjouterevennementComponent,
      },
      {
        path: 'stats',
        component: StatsComponent,
      },
      {
        path: 'modifierevennement/:id',
        component: ModifierevennementComponent,
      },
      {
        path: 'calendar',
        component: calendarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
