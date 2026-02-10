import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { TemperatureService } from '../temperature.service';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

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
      this.loadForDate(new Date());
    }
  }

  @Input() selectedDate?: string;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDate']) {
      const val = changes['selectedDate'].currentValue;
      if (val) {
        this.loadForDate(val);
      }
    }
  }

  private loadForDate(date: string | Date): void {
    this.tempService.getDailyTemperatures(date).subscribe(values => {
      this.lineChartData.labels = values.map((_, i) => `${i}:00`);
      (this.lineChartData.datasets[0].data as number[]) = values as number[];
      // Force chart update to ensure the new data is drawn
      setTimeout(() => this.chart?.update(), 0);
    });
  }
}
