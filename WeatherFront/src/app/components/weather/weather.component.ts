import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
   public weather: Weather;
   public chosenCity: string;
   public error: string;
   public Fahrenheit : string;
   public Celsius : string;
   public isFahrenheit : boolean = false;
  
  constructor(private http: HttpClient) {
     }

  public getWeather(chosenCity: string)
  {
    this.http.get('https://localhost:7082/api/weather/city/' + chosenCity).subscribe(result =>  this.weather = {
      temp: (result as any).temp,
      summary: (result as any).summary,
      city: (result as any).city
      
    }, 
    (error) => {
      this.error = "input isn't valid!"

    }
    
    );
  }
  
  
  handleClear()
  {
    
    window.location.reload();

  }

  moveToFR()
  {
    if(this.isFahrenheit == false)
    {
    const tempratureUpdated = Number(this.weather.temp);
    this.Fahrenheit = ((tempratureUpdated * 9) / 5 + 32).toFixed(1);
    this.weather.temp = this.Fahrenheit;
    this.isFahrenheit = true;
    }
  }

  moveToCL()
  {
    
    if(this.isFahrenheit == true)
    {
    const tempratureUpdated = Number(this.weather.temp);
    this.Celsius = (((tempratureUpdated - 32) * 5) / 9).toFixed(1);
    this.weather.temp = this.Celsius;
    this.isFahrenheit = false;
    }

  }


}

interface Weather {
  temp: string;
  summary: string;
  city: string;
}
