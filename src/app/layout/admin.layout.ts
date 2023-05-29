import { Component, OnInit, signal } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin-layout',
  template: `
    <mat-drawer-container
      class="w-full h-screen"
      [hasBackdrop]="currentScreenSize() === 'Large' || currentScreenSize() === 'XLarge' ? false : true"
    >
      <mat-drawer class="w-[270px]" #drawer [opened]="currentScreenSize() === 'Large' || currentScreenSize() === 'XLarge' ? true : false" [mode]="currentScreenSize() === 'Large' || currentScreenSize() === 'XLarge' ? 'side' : 'over'">I'm a drawer</mat-drawer>
      <mat-drawer-content>
        <button class="w-full" mat-raised-button (click)="drawer.toggle()">
          Toggle drawer
        </button>
        
        {{currentScreenSize()}}
        <router-outlet></router-outlet>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  standalone: true,
  imports: [RouterOutlet, OverlayModule, MatSidenavModule , MatButtonModule],
})
export class AdminLayout {
  public currentScreenSize = signal('');

  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize.set(
              this.displayNameMap.get(query) ?? 'Unknown'
            );
          }
        }
      });
  }
}
