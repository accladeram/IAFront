import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home-component',
  imports: [CommonModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent {
 events = [
    {
      image: 'https://source.unsplash.com/featured/?conference',
      title: 'Conferencia Tech 2025',
      location: 'La Paz, Bolivia',
      date: new Date('2025-07-20'),
    },
    {
      image: 'https://source.unsplash.com/featured/?concert',
      title: 'Festival de Música Andina',
      location: 'Cochabamba, Bolivia',
      date: new Date('2025-08-05'),
    },
    {
      image: 'https://source.unsplash.com/featured/?workshop',
      title: 'Taller de Inteligencia Artificial',
      location: 'Santa Cruz, Bolivia',
      date: new Date('2025-07-12'),
    },
    {
      image: 'https://source.unsplash.com/featured/?art',
      title: 'Exposición de Arte Urbano',
      location: 'Sucre, Bolivia',
      date: new Date('2025-09-01'),
    }
  ];
}
