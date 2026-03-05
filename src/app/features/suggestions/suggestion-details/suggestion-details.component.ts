import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/Services/suggestion.service';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrl: './suggestion-details.component.css'
})
export class SuggestionDetailsComponent implements OnInit {
  suggestionId: string | null = null;
  suggestion: Suggestion | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    this.suggestionId = this.route.snapshot.paramMap.get('id');
    if (this.suggestionId) {
      this.loadSuggestion(+this.suggestionId);
    }
  }

  loadSuggestion(id: number): void {
    this.suggestionService.getSuggestionById(id).subscribe({
      next: (data: any) => {
        this.suggestion = data.suggestion || data;
        console.log('Détails de la suggestion:', this.suggestion);
      },
      error: (error) => {
        console.error('Erreur lors du chargement de la suggestion:', error);
        this.router.navigate(['/suggestions']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/suggestions']);
  }

  updateSuggestion(): void {
    if (this.suggestion) {
      this.router.navigate(['/suggestions/add', this.suggestion.id]);
    }
  }

  getFormattedStatus(status: string): string {
    return status ? status.toUpperCase().replace('_', ' ') : 'EN ATTENTE';
  }
}
