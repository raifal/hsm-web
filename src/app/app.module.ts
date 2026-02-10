import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TemperatureService } from './temperature.service';
import { TemperatureChartComponent } from './temperature-chart/temperature-chart.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [AppComponent, TemperatureChartComponent],
  imports: [BrowserModule, NgChartsModule],
  providers: [TemperatureService],
  bootstrap: [AppComponent]
})
export class AppModule {}
