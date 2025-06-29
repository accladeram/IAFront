
import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./modules/eventos/components/home-component/home-component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth-component/auth-component').then(m => m.AuthComponent)
  },
  {
    path: 'history',
    loadComponent: () =>
      import('./modules/eventos/components/historical-component/historical-component').then(m => m.HistoricalComponent)
  },
  {
    path: 'chatbot',
    loadComponent: () =>
      import('./modules/eventos/components/chatbot-component/chatbot-component').then(m => m.ChatbotComponent)
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./modules/eventos/components/profile-component/profile-component').then(m => m.ProfileComponent)
  },
  {
    path: 'payment',
    loadComponent: () =>
      import('./modules/eventos/components/payment-component/payment-component').then(m => m.PaymentComponent)
  }
];
