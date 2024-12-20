import { Routes } from '@angular/router';
import { TeamsListComponent } from './Team/components/teams-list/teams-list.component';
import { LeagueListComponent } from './League/components/league-list/league-list.component';
import { ProfileComponent } from './Profile/components/profile/profile.component';
import { NextMatchesListComponent } from './Match/components/next-matches-list/next-matches-list.component';
import { LoginComponent } from './Auth/components/login/login.component';
import { RegisterComponent } from './Auth/components/register/register.component';
import { TeamDetailComponent } from './Team/components/team-detail/team-detail.component';
import { TeamFormComponent } from './Team/components/team-form/team-form.component';
import { AddPlayerComponent } from './Team/components/add-player/add-player.component';
import { LeagueCreateComponent } from './League/components/league-create/league-create.component';
import { NotFoundComponent } from './Shared/components/not-found/not-found.component';
import { EditProfileComponent } from './Profile/components/edit-profile/edit-profile.component';
import { EditMatchComponent } from './Match/components/edit-match/edit-match.component';
import { MatchesListComponent } from './Match/components/matches-list/matches-list.component';
import { LeagueTableComponent } from './League/components/league-table/league-table.component';
import { LeagueDetailComponent } from './League/components/league-detail/league-detail.component';
import { authGuard } from './Auth/guards/auth-guard';
import { AddTeamComponent } from './League/components/add-team/add-team.component';

export const routes: Routes = [
  {
    path: 'login',
    component:LoginComponent,
  },
  {
    path: 'register',
    component:RegisterComponent,
  },
  { 
    path: '', 
    redirectTo: 'next-matches', 
    pathMatch: 'full',
  },
  {
    path: 'next-matches',
    component: NextMatchesListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'my-teams',
    component: TeamsListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'my-teams/team-form',
    component: TeamFormComponent,
    canActivate: [authGuard],

    children: [
      {
        path: 'add-player',
        component: AddPlayerComponent,
      }
    ]
  },
  {
    path: 'my-teams/:teamId',
    component: TeamDetailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'my-leagues',
    component: LeagueListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'my-leagues/create',
    component: LeagueCreateComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'add-team',
        component: AddTeamComponent,
      }
    ]
  },
  {
    path: 'my-leagues/:leagueId',
    component: LeagueDetailComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'table',
        component: LeagueTableComponent,
      },
      {
        path: 'matches',
        component: MatchesListComponent,
      },
    ]
  },
  {
    path: 'match/edit/:matchId',
    component: EditMatchComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile/edit',
    component: EditProfileComponent,
    canActivate: [authGuard],
  },
  { path: '**', component: NotFoundComponent }
];
