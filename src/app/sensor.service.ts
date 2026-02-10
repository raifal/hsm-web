import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Sensor {
  id: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class SensorService {
  /** Liefert eine fixe Liste von Sensoren (id + name) */
  getSensors(): Observable<Sensor[]> {
    const sensors: Sensor[] = [
      { id: 's1', name: 'Sensor Wohnzimmer' },
      { id: 's2', name: 'Sensor Küche' },
      { id: 's3', name: 'Sensor Büro' },
      { id: 's4', name: 'Sensor Aussen' }
    ];
    return of(sensors);
  }
}
