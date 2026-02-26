import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrl: './suggestion-form.component.css'
})
export class SuggestionFormComponent implements OnInit {
  suggestionForm!: FormGroup;
  
  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.suggestionForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[A-Z][a-zA-Z\\s\']*$')
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(30)
      ]],
      category: ['', Validators.required],
      date: [{ value: new Date().toISOString().split('T')[0], disabled: true }],
      status: [{ value: 'en attente', disabled: true }]
    });
  }

  onSubmit(): void {
    if (this.suggestionForm.valid) {
      // Récupérer les données du formulaire
      const formValue = this.suggestionForm.getRawValue();
      
      // Créer une nouvelle suggestion
      const newSuggestion = {
        id: this.generateId(),
        title: formValue.title,
        description: formValue.description,
        category: formValue.category,
        date: new Date(formValue.date),
        status: 'en_attente',
        nbLikes: 0
      };

      // Ajouter la suggestion à la liste (via localStorage ou service)
      this.addSuggestionToList(newSuggestion);

      // Rediriger vers la liste
      this.router.navigate(['/suggestions']);
    }
  }

  private generateId(): number {
    // Récupérer les suggestions du localStorage
    const suggestions = this.getSuggestionsFromStorage();
    if (suggestions.length === 0) {
      return 1;
    }
    // Retourner le max id + 1
    return Math.max(...suggestions.map(s => s.id)) + 1;
  }

  private addSuggestionToList(suggestion: any): void {
    const suggestions = this.getSuggestionsFromStorage();
    suggestions.push(suggestion);
    localStorage.setItem('suggestions', JSON.stringify(suggestions));
  }

  private getSuggestionsFromStorage(): any[] {
    const storedSuggestions = localStorage.getItem('suggestions');
    return storedSuggestions ? JSON.parse(storedSuggestions) : [];
  }

  // Méthodes pour accéder facilement aux contrôles du formulaire
  get title() { return this.suggestionForm.get('title'); }
  get description() { return this.suggestionForm.get('description'); }
  get category() { return this.suggestionForm.get('category'); }
}
