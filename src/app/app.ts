import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/menu-component/menu-component';
import { AuthComponent } from './components/auth-component/auth-component';
import { ChatbotComponent } from './modules/eventos/components/chatbot-component/chatbot-component';
import { HistoricalComponent } from './modules/eventos/components/historical-component/historical-component';
import { PaymentComponent } from './modules/eventos/components/payment-component/payment-component';
import { HomeComponent } from './modules/eventos/components/home-component/home-component';
import { ProfileComponent } from './modules/eventos/components/profile-component/profile-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    MenuComponent,
      AuthComponent,
     ChatbotComponent,
     HistoricalComponent,
     HomeComponent,
     PaymentComponent,
    ProfileComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'iafrontendhackathon';
}
