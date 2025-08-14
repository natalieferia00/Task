import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import { AuthService } from '../services/auth';
import { IonTabs, IonTabButton, IonTabBar, IonRouterOutlet, IonIcon, IonLabel } from "@ionic/angular/standalone";

@Component({
    selector: 'app-tabs',
    standalone: true,
    imports: [IonLabel, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, RouterLink, RouterLinkActive, CommonModule, RouterOutlet],
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
