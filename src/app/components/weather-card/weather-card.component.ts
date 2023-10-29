import { Component, Input } from '@angular/core';
import { NgIf, DecimalPipe, CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faDroplet,
  faTemperatureHigh,
  faTemperatureLow,
  faWind,
} from '@fortawesome/free-solid-svg-icons';

import { WeatherData } from 'src/app/_models/weather.interface';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule], // NgIf, DecimalPipe,
  template: `
    <div class="container" *ngIf="weatherDataInput">
      <div class="upper-data">
        <img
          src="../../../../../assets/sun.jpg"
          alt="sun"
          *ngIf="weatherDataInput.main.temp > 15"
        />
        <img
          src="../../../../../assets/cold1.jpg"
          alt="cold"
          *ngIf="weatherDataInput.main.temp <= 15"
        />
        <div class="weather-data">
          <div class="location">
            {{ weatherDataInput.name }}
          </div>
          <div class="temperature">
            {{ weatherDataInput.main.temp | number : '1.0-0' }}ºC
          </div>
        </div>
      </div>
      <div class="lower-data">
        <div class="more-info-label">Mais informações</div>
        <div class="more-info-container">
          <div class="info-block">
            <div class="info-block-label">
              <fa-icon size="lg" [icon]="minTemperatureIcon"></fa-icon>
              <span>Mínima</span>
            </div>
            <div class="info-block-value">
              {{ weatherDataInput.main.temp_min | number : '1.0-0' }}ºC
            </div>
          </div>
          <div class="info-block">
            <div class="info-block-label">
              <fa-icon size="lg" [icon]="maxTemperatureIcon"></fa-icon>
              <span>Máxima</span>
            </div>
            <div class="info-block-value">
              {{ weatherDataInput.main.temp_max | number : '1.0-0' }}ºC
            </div>
          </div>
          <div class="info-block">
            <div class="info-block-label">
              <fa-icon size="lg" [icon]="humidityIcon"></fa-icon>
              <span>Humidade</span>
            </div>
            <div class="info-block-value">
              {{ weatherDataInput.main.humidity }}%
            </div>
          </div>
          <div class="info-block">
            <div class="info-block-label">
              <fa-icon size="lg" [icon]="windIcon"></fa-icon>
              <span>Vento</span>
            </div>
            <div class="info-block-value">
              {{ weatherDataInput.wind.speed }} km/h
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class WeatherCardComponent {
  // dados da previsão do tempo recebidos do componente pai
  @Input() weatherDataInput!: WeatherData;

  humidityIcon = faDroplet;
  maxTemperatureIcon = faTemperatureHigh;
  minTemperatureIcon = faTemperatureLow;
  windIcon = faWind;
}
