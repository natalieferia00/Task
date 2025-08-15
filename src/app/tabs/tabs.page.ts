import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';
import {
  IonTabs,
  IonTabButton,
  IonTabBar,
  IonRouterOutlet,
  IonIcon,
  IonLabel,
  IonTitle,
  IonToolbar,
  IonHeader,
} from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonLabel,
    IonIcon,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    RouterOutlet,
    IonicModule,
  ],
  templateUrl: './tabs.page.html',
  styleUrl: './tabs.page.scss',
})
export class TabsComponent {
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
