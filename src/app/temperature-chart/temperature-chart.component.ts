import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { TemperatureService } from '../temperature.service';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-temperature-chart',
  templateUrl: './temperature-chart.component.html'
})
export class TemperatureChartComponent implements OnInit, OnChanges {
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Temperatur (°C)',
        fill: false,
        borderColor: 'rgb(75, 192, 192)'
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {},
      y: { beginAtZero: false }
    }
  };

  constructor(private tempService: TemperatureService) {}

  ngOnInit(): void {
    // initial load handled in ngOnChanges or here if no date provided
    if (!this.selectedDate) {
      this.loadForDateAndSensors(new Date(), this.selectedSensors || []);
    }
  }

  @Input() selectedDate?: string;
  @Input() selectedSensors: string[] = [];
  @Input() sensors: { id: string; name: string; color?: string }[] = [];
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDate'] || changes['selectedSensors']) {
      const date = this.selectedDate ? this.selectedDate : new Date();
      this.loadForDateAndSensors(date, this.selectedSensors || []);
    }
  }

  private loadForDateAndSensors(date: string | Date, sensors: string[]): void {
    if (!sensors || sensors.length === 0) {
      // no sensors selected -> clear data
      this.lineChartData.labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
      this.lineChartData.datasets = [];
      setTimeout(() => this.chart?.update(), 0);
      return;
    }

    const calls = sensors.map(id => this.tempService.getDailyTemperatures(date, id));
    forkJoin(calls).subscribe(results => {
      this.lineChartData.labels = results[0].map((_, i) => `${i}:00`);
      this.lineChartData.datasets = results.map((values, idx) => {
        const id = sensors[idx];
        const sensor = this.sensors.find(s => s.id === id);
        return {
          data: values,
          label: sensor ? sensor.name : `Sensor ${id}`,
          fill: false,
          borderColor: sensor?.color ?? this.pickColor(idx)
        } as any;
      });
      setTimeout(() => this.chart?.update(), 0);
    });
  }

  private pickColor(idx: number): string {
    const palette = ['#4dc9f6', '#f67019', '#f53794', '#537bc4', '#acc236', '#166a8f'];
    return palette[idx % palette.length];
  }
}
