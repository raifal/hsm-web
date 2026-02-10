import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class TemperatureService {
  /** Liefert 24 Dummy-Werte (Stunden 0-23) */
  getDailyTemperatures(): Observable<number[]> {
    const base = 15; // Basis-Temperatur
    const values: number[] = [];
    for (let h = 0; h < 24; h++) {
      // Simulierter Tagesverlauf: kühler in der Nacht, wärmer am Nachmittag
      const dayFactor = Math.sin((h / 24) * Math.PI * 2 - Math.PI / 2) * 6;
      const noise = (Math.random() - 0.5) * 1.5;
      values.push(Math.round((base + dayFactor + noise) * 10) / 10);
    }
    return of(values);
  }
}
