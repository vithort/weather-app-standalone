import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { WeatherHomeComponent } from './app/components/weather-home/weather-home.component';

bootstrapApplication(WeatherHomeComponent, appConfig)
  .catch((err) => console.error(err));
