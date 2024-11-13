import { Routes } from '@angular/router';
import { TeamsListComponent } from './Team/components/teams-list/teams-list.component';
import { LeagueListComponent } from './League/components/league-list/league-list.component';
import { ProfileComponent } from './Profile/components/profile/profile.component';
import { NextMatchesListComponent } from './League/components/next-matches-list/next-matches-list.component';
import { LoginComponent } from './Auth/components/login/login.component';
import { RegisterComponent } from './Auth/components/register/register.component';
import { TeamDetailComponent } from './Team/components/team-detail/team-detail.component';
import { TeamFormComponent } from './Team/components/team-form/team-form.component';
import { AddPlayerComponent } from './Team/components/add-player/add-player.component';
import { LeagueCreateComponent } from './League/components/league-create/league-create.component';
import { NotFoundComponent } from './Shared/components/not-found/not-found.component';
import { EditProfileComponent } from './Profile/components/edit-profile/edit-profile.component';
import { EditMatchComponent } from './League/components/edit-match/edit-match.component';
import { MatchesListComponent } from './League/components/matches-list/matches-list.component';
import { LeagueTableComponent } from './League/components/league-table/league-table.component';
import { LeagueDetailComponent } from './League/components/league-detail/league-detail.component';

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
    pathMatch: 'full' 
  },
  {
    path: 'next-matches',
    component: NextMatchesListComponent,
  },
  {
    path: 'my-teams',
    component: TeamsListComponent,
  },
  {
    path: 'team/form',
    component: TeamFormComponent,

    children: [
      {
        path: 'add-player',
        component: AddPlayerComponent,
      }
    ]
  },
  {
    path: 'my-team/:teamId',
    component: TeamDetailComponent,
  },
  {
    path: 'my-leagues',
    component: LeagueListComponent,
  },
  {
    path: 'league/create',
    component: LeagueCreateComponent,
  },
  {
    path: 'my-league/:leagueId',
    component: LeagueDetailComponent,
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
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'profile-edit',
    component: EditProfileComponent,
  },
  { path: '**', component: NotFoundComponent }
];
