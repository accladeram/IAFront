import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IEvent } from '../../../interfaces/ievent';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-component',
   imports: [CommonModule, FormsModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent {
  searchTerm = '';
   activeTab = 'favorites';

   events: IEvent[] = [
     {
       id: 1,
       artist: 'Helena',
       eventTitle: 'GRAN ENTRADA FOLKLORICA UNIVERSITARIA',
       venue: 'UAGRM',
       date: '25 NOVIEMBRE',
       location: 'Santa Cruz, Bolivia',
       imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop',
       timeAgo: '3 min'
     },
     {
       id: 2,
       artist: 'Los Kjarkas',
       eventTitle: 'CONCIERTO SINFÓNICO',
       venue: 'Teatro Municipal',
       date: '15 DICIEMBRE',
       location: 'La Paz, Bolivia',
       imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=600&fit=crop',
       timeAgo: '1 hr'
     },
     {
       id: 3,
       artist: 'Kalamarka',
       eventTitle: 'FESTIVAL DE MÚSICA ANDINA',
       venue: 'Plaza Principal',
       date: '8 ENERO',
       location: 'Cochabamba, Bolivia',
       imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=600&fit=crop',
       timeAgo: '2 hrs'
     }
   ];


   setActiveTab(tab: string) {
     this.activeTab = tab;
   }

   viewMore(event: IEvent) {
     console.log('Ver más:', event);
     // Implement navigation to event details
   }

   addToWishlist(event: IEvent) {
     console.log('Agregar a wishlist:', event);
     // Implement wishlist functionality
   }

   shareEvent(event: IEvent) {
     console.log('Compartir evento:', event);
     // Implement share functionality
     if (navigator.share) {
       navigator.share({
         title: event.eventTitle,
         text: `¡Mira este evento de ${event.artist}!`,
         url: window.location.href
       });
     }
   }
}
