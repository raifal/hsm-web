import { Component, OnInit } from '@angular/core';
import { TemperatureService } from '../temperature.service';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-temperature-chart',
  templateUrl: './temperature-chart.component.html'
})
export class TemperatureChartComponent implements OnInit {
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
    this.tempService.getDailyTemperatures().subscribe(values => {
      this.lineChartData.labels = values.map((_, i) => `${i}:00`);
      (this.lineChartData.datasets[0].data as number[]) = values as number[];
    });
  }
}
