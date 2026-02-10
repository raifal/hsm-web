import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TemperatureService {
  /** Liefert 24 Dummy-Werte (Stunden 0-23) für ein gegebenes Datum und Sensor. */
  getDailyTemperatures(date?: string | Date, sensorId?: string): Observable<number[]> {
    const base = 15; // Basis-Temperatur
    const values: number[] = [];
    const seed = this.seedFromDateAndSensor(date, sensorId);
    for (let h = 0; h < 24; h++) {
      const dayFactor = Math.sin((h / 24) * Math.PI * 2 - Math.PI / 2) * 6;
      const noise = (this.rand(seed + h) - 0.5) * 1.5;
      values.push(Math.round((base + dayFactor + noise) * 10) / 10);
    }
    return of(values);
  }

  private seedFromDateAndSensor(date?: string | Date, sensorId?: string): number {
    const d = date ? new Date(date) : new Date();
    const dateSeed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    const sensorSeed = sensorId ? this.hashString(sensorId) : 0;
    return dateSeed + sensorSeed;
  }

  private hashString(s: string): number {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
      h = (h << 5) - h + s.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h);
  }

  // simple pseudo-random based on integer seed
  private rand(n: number): number {
    let x = (n % 2147483647) + 1;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return (Math.abs(x) % 1000) / 1000;
  }
}
