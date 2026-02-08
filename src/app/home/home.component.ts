import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  imageUrl: string = 'https://angular.io/assets/images/logos/angular/angular.svg';
  isDisabled: boolean = false;
  v3: string = "Abrougui";

  fn() {
    alert('Hello from function!');
  }

  student1 = [
    { name: 'John Doe', age: 20, grade: 'A' }
  ];

  student2 = [
    { id: 1, name: 'Alice', age: 22 },
    { id: 2, name: 'Bob', age: 21 }
  ];
}

