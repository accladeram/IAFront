import { Component } from '@angular/core';
import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-profile-component',
  imports: [],
  templateUrl: './profile-component.html',
  styleUrl: './profile-component.css'
})
export class ProfileComponent {
userProfile: IUser = {
    fullName: 'Luis Romero Perez',
    email: 'luisromeroperez@gmail.com',
    phoneNumber: '+591 72150003',
    userType: 'Cliente',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face'
  };

  goBack() {
    console.log('Going back...');
    // Implement navigation back
    window.history.back();
  }

  openSettings() {
    console.log('Opening settings...');
    // Implement settings navigation
  }

  editProfile() {
    console.log('Editing profile...');
    // Implement profile editing
  }

  logout() {
    console.log('Logging out...');
    // Implement logout functionality
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      // Clear user session
      localStorage.removeItem('userToken');
      // Redirect to login
      window.location.href = '/login';
    }
  }
}
