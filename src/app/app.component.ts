import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  text = '';
  result = '';
  confidence: number | null = null;

  API_URL = 'http://bitshawk-technologies.net:8001/predict';
  API_KEY = 'supersecretkey';

  constructor(private http: HttpClient) {}

  submit() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': this.API_KEY
    });

    this.http.post<any>(this.API_URL, { text: this.text }, { headers })
      .subscribe(data => {
        this.result = data.sentiment;
        this.confidence = data.confidence;
      });
  }
}
