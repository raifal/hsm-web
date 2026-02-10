import { Component } from '@angular/core';
import { SensorService, Sensor } from './sensor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'hsm-web';

  selectedDate: string;
  today: string;
  sensors: Sensor[] = [];
  selectedSensors: string[] = [];

  constructor(private sensorService: SensorService) {
    const today = new Date();
    this.selectedDate = this.toDateInputValue(today);
    this.today = this.toDateInputValue(today);

    this.sensorService.getSensors().subscribe(list => {
      this.sensors = list;
      if (list.length) {
        this.selectedSensors = [list[0].id];
      }
    });
  }

  toDateInputValue(date: Date): string {
    const tzOffset = date.getTimezoneOffset() * 60000;
    const localISO = new Date(date.getTime() - tzOffset).toISOString().slice(0, 10);
    return localISO;
  }

  prevDay(): void {
    const d = new Date(this.selectedDate);
    d.setDate(d.getDate() - 1);
    this.selectedDate = this.toDateInputValue(d);
  }

  nextDay(): void {
    const d = new Date(this.selectedDate);
    d.setDate(d.getDate() + 1);
    const today = new Date();
    const todayStr = this.toDateInputValue(today);
    if (this.toDateInputValue(d) <= todayStr) {
      this.selectedDate = this.toDateInputValue(d);
    }
  }

  isNextDisabled(): boolean {
    const d = new Date(this.selectedDate);
    const today = new Date();
    return this.toDateInputValue(d) >= this.toDateInputValue(today);
  }
}
