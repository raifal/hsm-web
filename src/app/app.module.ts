import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TemperatureService } from './temperature.service';
import { TemperatureChartComponent } from './temperature-chart/temperature-chart.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [AppComponent, TemperatureChartComponent],
  imports: [BrowserModule, FormsModule, NgChartsModule],
  providers: [TemperatureService],
  bootstrap: [AppComponent]
})
export class AppModule {}
