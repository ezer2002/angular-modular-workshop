import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/Services/suggestion.service'; 

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrl: './suggestion-list.component.css'
})
export class SuggestionListComponent implements OnInit {
  searchTerm: string = '';
  favorites: Suggestion[] = [];

  suggestions: Suggestion[] = [];

  constructor(
    private suggestionService: SuggestionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadSuggestions();
  }

  private loadSuggestions(): void {
    this.suggestionService.getSuggestionsList().subscribe({
      next: (data) => {
        this.suggestions = data;
        console.log('Liste des suggestions:', this.suggestions);
        console.log('Nombre total de suggestions:', this.suggestions.length);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des suggestions:', error);
      }
    });
  }

  // filtrer les suggestions par titre et catégorie
  get filteredSuggestions(): Suggestion[] {
    if (!this.searchTerm.trim()) {
      return this.suggestions;
    }

    const searchLower = this.searchTerm.toLowerCase();
    return this.suggestions.filter(suggestion =>
      suggestion.title.toLowerCase().includes(searchLower) ||
      suggestion.category.toLowerCase().includes(searchLower)
    );

  }

  //incrémenter les likes
  likeSuggestion(suggestion: Suggestion): void {
    this.suggestionService.updateLikes(suggestion.id).subscribe({
      next: () => {
        suggestion.nbLikes++;
        console.log(`Like ajouté pour "${suggestion.title}". Nombre de likes:`, suggestion.nbLikes);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour des likes:', error);
      }
    });
  }

  // Supprimer une suggestion
  deleteSuggestion(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette suggestion?')) {
      this.suggestionService.deleteSuggestion(id).subscribe({
        next: () => {
          console.log('Suggestion supprimée avec succès');
          this.loadSuggestions(); // Recharger la liste
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
        }
      });
    }
  }

  //ajouter une suggestion aux favoris
  addToFavorites(suggestion: Suggestion): void {
    if (!this.favorites.find(fav => fav.id === suggestion.id)) {
      this.favorites.push(suggestion);
      console.log(`"${suggestion.title}" ajouté aux favoris`);
      console.log('Liste des favoris:', this.favorites);
      console.log('Nombre de favoris:', this.favorites.length);
      alert(`"${suggestion.title}" a été ajouté aux favoris!`);
    } else {
      console.log('Cette suggestion est déjà dans les favoris');
      alert('Cette suggestion est déjà dans vos favoris!');
    }
  }
}
