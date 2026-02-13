import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuggestionListComponent } from './suggestion-list/suggestion-list.component';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';

const routes: Routes = [
  { path: '', component: SuggestionListComponent },       // /suggestions
  { path: ':id', component: SuggestionDetailsComponent }  // /suggestions/:id
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuggestionsRoutingModule { }


