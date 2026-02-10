import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class TemperatureService {
  /** Liefert 24 Dummy-Werte (Stunden 0-23) für ein gegebenes Datum. */
  getDailyTemperatures(date?: string | Date): Observable<number[]> {
    const base = 15; // Basis-Temperatur
    const values: number[] = [];
    const seed = this.seedFromDate(date);
    for (let h = 0; h < 24; h++) {
      const dayFactor = Math.sin((h / 24) * Math.PI * 2 - Math.PI / 2) * 6;
      const noise = (this.rand(seed + h) - 0.5) * 1.5;
      values.push(Math.round((base + dayFactor + noise) * 10) / 10);
    }
    return of(values);
  }

  private seedFromDate(date?: string | Date): number {
    const d = date ? new Date(date) : new Date();
    // Simple deterministic seed from date components (year*10000 + month*100 + day)
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  }

  // xorshift-like simple pseudo-random based on seed
  private rand(n: number): number {
    let x = (n % 2147483647) + 1;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return (x % 1000) / 1000;
  }
}
