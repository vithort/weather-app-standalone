import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { WeatherHomeComponent } from './components/weather-home/weather-home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, WeatherHomeComponent],
  template: ` <app-weather-home> <app-weather-home/> `,
  styles: [],
})
export class AppComponent {
  title = 'weather-app-standalone';
}
