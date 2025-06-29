import { Component, OnInit } from '@angular/core';
import { IEventHistorical } from '../../interfaces/ievent-historical';
import { CommonModule } from '@angular/common';
import { EventsService } from '../../services/events-service';

@Component({
  selector: 'app-historical-component',
  imports: [CommonModule],
  templateUrl: './historical-component.html',
  styleUrl: './historical-component.css'
})
export class HistoricalComponent implements OnInit  {

  eventHistory: IEventHistorical[]=[];

  constructor(private  eventService: EventsService) {}

  sortedEvents: IEventHistorical[] = [];

  ngOnInit() {
    this.loadEventHistory();

  }

   async loadEventHistory(): Promise<void> {
    this.eventService.getHistorical().subscribe((res: any) => {
        if (res !== null) {
          this.eventHistory = res;
          this.sortEventsByDate();
        }
      }
    );
  }



  sortEventsByDate() {
    this.sortedEvents = [...this.eventHistory].sort((a, b) => {
      return new Date(b.fecha_evento).getTime() - new Date(a.fecha_evento).getTime();
    });
  }

  getUniqueYears(): string[] {
    const years = this.eventHistory.map(event =>
      new Date(event.fecha_evento).getFullYear().toString()
    );
    return [...new Set(years)];
  }

  formatYear(dateString: string): string {
    return new Date(dateString).getFullYear().toString();
  }

  formatFullDate(dateString: string): string {
    const date = new Date(dateString);
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  getTimeAgo(dateString: string): string {
    const now = new Date();
    const eventDate = new Date(dateString);
    const diffInMs = now.getTime() - eventDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Hoy';
    if (diffInDays === 1) return 'Mañana';
    if (diffInDays < 30) return `${diffInDays} días atrás`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} meses atrás`;
    return `${Math.floor(diffInDays / 365)} años atrás`;
  }

  trackByEventId(index: number, event: IEventHistorical): string {
    return `${event.id_usuario}-${event.createdAt}`;
  }

  goBack() {
    console.log('Going back...');
    window.history.back();
  }

  viewEventDetails(event: IEventHistorical) {
    console.log('Viewing event details:', event);
  }

}
