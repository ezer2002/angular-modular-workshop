import { Component, OnInit } from '@angular/core';
import { Suggestion } from '../../models/suggestion';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrl: './list-suggestion.component.css'
})
export class ListSuggestionComponent implements OnInit {
  searchTerm: string = '';
  favorites: Suggestion[] = [];

  suggestions: Suggestion[] = [
    {
      id: 1,
      title: 'Organiser une journée team building',
      description: 'Suggestion pour organiser une journée de team building pour renforcer les liens entre les membres de l\'équipe.',
      category: 'Événements',
      date: new Date('2025-01-20'),
      status: 'acceptee',
      nbLikes: 10
    },
    {
      id: 2,
      title: 'Améliorer le système de réservation',
      description: 'Proposition pour améliorer la gestion des réservations en ligne avec un système de confirmation automatique.',
      category: 'Technologie',
      date: new Date('2025-01-15'),
      status: 'refusee',
      nbLikes: 0
    },
    {
      id: 3,
      title: 'Créer un système de récompenses',
      description: 'Mise en place d\'un programme de récompenses pour motiver les employés et reconnaître leurs efforts.',
      category: 'Ressources Humaines',
      date: new Date('2025-01-25'),
      status: 'refusee',
      nbLikes: 0
    },
    {
      id: 4,
      title: 'Moderniser l\'interface utilisateur',
      description: 'Refonte complète de l\'interface utilisateur pour une meilleure expérience utilisateur.',
      category: 'Technologie',
      date: new Date('2025-01-30'),
      status: 'en_attente',
      nbLikes: 0
    }
  ];

  ngOnInit(): void {
    console.log('Liste des suggestions:', this.suggestions);
    console.log('Nombre total de suggestions:', this.suggestions.length);
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
    suggestion.nbLikes++;
    console.log(`Like ajouté pour "${suggestion.title}". Nombre de likes:`, suggestion.nbLikes);
    console.log('Liste des suggestions mise à jour:', this.suggestions);
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
