import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-aside',
  imports: [CommonModule, RouterLink],
  templateUrl: './aside.html',
  styleUrl: './aside.scss',
})
export class Aside {
  isCollapsed = false;
  activeSubmenu: string | null = null;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) this.activeSubmenu = null; // cerrar submenús al colapsar
  }

  toggleSubmenu(menu: string) {
    this.activeSubmenu = this.activeSubmenu === menu ? null : menu;
  }
}
