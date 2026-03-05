import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuggestionService } from '../../../core/Services/suggestion.service';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrl: './suggestion-form.component.css'
})
export class SuggestionFormComponent implements OnInit {
  suggestionForm!: FormGroup;
  id: number | null = null;
  suggestion: Suggestion | null = null;
  isEditMode: boolean = false;
  
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
    private router: Router,
    private actR: ActivatedRoute,
    private service: SuggestionService
  ) {}

  ngOnInit(): void {
    this.initForm();
    
    // Vérifier si on est en mode édition
    this.id = +this.actR.snapshot.params['id'];
    if (this.id) {
      this.isEditMode = true;
      this.loadSuggestion();
    }
  }

  initForm(): void {
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

  loadSuggestion(): void {
    this.service.getSuggestionById(this.id!).subscribe({
      next: (response: any) => {
        const data = response.suggestion || response;
        this.suggestion = data;
        this.suggestionForm.patchValue({
          title: data.title,
          description: data.description,
          category: data.category,
          date: new Date(data.date).toISOString().split('T')[0],
          status: data.status
        });
      },
      error: (error) => {
        console.error('Erreur lors du chargement de la suggestion:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.suggestionForm.valid) {
      const formValue = this.suggestionForm.getRawValue();
      
      const suggestionData: any = {
        title: formValue.title,
        description: formValue.description,
        category: formValue.category,
        date: new Date(formValue.date),
        status: formValue.status.replace(' ', '_'),
        nbLikes: this.suggestion?.nbLikes || 0
      };

      if (this.isEditMode && this.id) {
        // Mode mise à jour
        this.service.updateSuggestion(this.id, suggestionData).subscribe({
          next: () => {
            console.log('Suggestion mise à jour avec succès');
            this.router.navigate(['/suggestions']);
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour:', error);
          }
        });
      } else {
        // Mode ajout
        this.service.addSuggestion(suggestionData).subscribe({
          next: () => {
            console.log('Suggestion ajoutée avec succès');
            this.router.navigate(['/suggestions']);
          },
          error: (error) => {
            console.error('Erreur lors de l\'ajout:', error);
          }
        });
      }
    }
  }

  
  get title() { return this.suggestionForm.get('title'); }
  get description() { return this.suggestionForm.get('description'); }
  get category() { return this.suggestionForm.get('category'); }
}
