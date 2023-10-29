import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Subject, takeUntil } from 'rxjs';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { WeatherData } from 'src/app/_models/weather.interface';
import { WeatherService } from 'src/app/_services/weather.service';
import { WeatherCardComponent } from '../weather-card/weather-card.component';

@Component({
  selector: 'app-weather-home',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, WeatherCardComponent],
  template: `
    <div class="search">
      <form #form="ngForm" (submit)="onSubmit()">
        <input
          type="text"
          placeholder="Buscar Localização"
          name="city"
          [(ngModel)]="initialCityName"
        />

        <span (click)="onSubmit()">
          <fa-icon
            animation="fade"
            style="--fa-animation-duration: 5s; cursor: pointer"
            size="lg"
            class="search-icon"
            [icon]="searchIcon"
          ></fa-icon>
        </span>
      </form>
    </div>

    <app-weather-card
      *ngIf="weatherData"
      [weatherDataInput]="weatherData"
    ></app-weather-card>
  `,
  styles: [],
})
export class WeatherHomeComponent implements OnInit, OnDestroy {
  initialCityName = 'São Paulo';
  searchIcon = faMagnifyingGlass;
  weatherData!: WeatherData;

  private readonly destroy$: Subject<void> = new Subject();

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherData(this.initialCityName);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    this.getWeatherData(this.initialCityName);
    this.initialCityName = '';
  }

  private getWeatherData(cityName: string): void {
    this.weatherService
      .getWeatherData(cityName)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: WeatherData) => {
          response && (this.weatherData = response);
          console.log(this.weatherData);
        },
        error: (error) => console.log(error),
      });
  }
}
