import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventsService } from '../../services/events-service';
import { IEvent } from '../../interfaces/event-interface';

@Component({
  selector: 'app-home-component',
   imports: [CommonModule, FormsModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent   implements OnInit {
  searchTerm = '';
   activeTab = 'favorites';
    eventos: IEvent[]=[];
    datos: any;

  constructor(private  eventService: EventsService) {}

  ngOnInit(): void {
    this.loadEventos();
  }

   async loadEventos(): Promise<void> {
    this.eventService.getAllRecommended().subscribe((res: any) => {
        if (res !== null) {
          this.eventos = res;
        }
      }
    );
  }

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
         title: event.nombre,
         text: `¡Mira este evento de ${event.artista}!`,
         url: window.location.href
       });
     }
   }
}
