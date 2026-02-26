import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  userForm!: FormGroup;
  successMessage: string = '';
  
  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      city: new FormControl('', Validators.required),
    })
  }

  adduser() {
    if (this.userForm.valid) {
      console.log('Utilisateur ajouté:', this.userForm.value);
      this.successMessage = '✓ Utilisateur ajouté avec succès!';
      
      // Réinitialiser le formulaire après 2 secondes
      setTimeout(() => {
        this.userForm.reset();
        this.successMessage = '';
      }, 2000);
    }
  }

}
