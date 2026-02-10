import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Sensor {
  id: string;
  name: string;
  color?: string;
}

@Injectable({ providedIn: 'root' })
export class SensorService {
  /** Liefert eine fixe Liste von Sensoren (id + name) */
  getSensors(): Observable<Sensor[]> {
    const sensors: Sensor[] = [
      { id: 's1', name: 'Sensor Wohnzimmer', color: '#4dc9f6' },
      { id: 's2', name: 'Sensor Küche', color: '#f67019' },
      { id: 's3', name: 'Sensor Büro', color: '#f53794' },
      { id: 's4', name: 'Sensor Aussen', color: '#537bc4' },
      { id: 's5', name: 'Sensor Boiler', color: '#000000' },
      { id: 's6', name: 'Sensor Keller', color: '#166a8f' }
    ];
    return of(sensors);
  }
}
