import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import { AuthService } from '../services/auth';
import { IonTabs, IonTabButton, IonTabBar, IonRouterOutlet, IonIcon, IonLabel, IonTitle, IonToolbar, IonHeader } from "@ionic/angular/standalone";
import { IonicModule } from "@ionic/angular";

@Component({
    selector: 'app-tabs',
    standalone: true,
    imports: [IonHeader, IonToolbar, IonTitle, IonLabel, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, RouterLink, RouterLinkActive, CommonModule, RouterOutlet, IonicModule],
    templateUrl: './tabs.page.html',
    styleUrl: './tabs.page.scss'
})
export class TabsComponent {
    // Inyectamos el servicio de autenticación
    private authService = inject(AuthService);

    // Método que llama al servicio para cerrar la sesión
    logout() {
        this.authService.logout();
    }
}
