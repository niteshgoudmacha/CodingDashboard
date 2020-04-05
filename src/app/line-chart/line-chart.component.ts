import { Component, OnInit, ViewChild  } from '@angular/core';
import { Chart } from 'chart.js';
import { Data } from '../data';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  url = 'http://localhost:58617/API/Charts/GetCharts';  

  data: Data[];  

  Player = [];  

  Run = [];  

  Linechart = [];  

  constructor(private httpClient: HttpClient) { }  

  ngOnInit() {  

    // this.httpClient.get(this.url).subscribe((result: Data[]) => {  

    //   result.forEach(x => {  

    //     this.Player.push(x.PlayerName);  

    //     this.Run.push(x.Run);  

      // });  

    this.Player.push("initail");
    this.Run.push("1400");
    // this.Player.push("abc");
    // this.Run.push("250");
    // this.Player.push("abc");
    // this.Run.push("100");

      this.Linechart = new Chart('canvas', {  

        type: 'line',  

        data: {  

          labels: this.Player,  

          datasets: [  

            {  

              data: this.Run,  

              borderColor: '#3cb371',  

              backgroundColor: "#C9E0CA",  

            }  

          ]  

        },  

        options: {  

          legend: {  

            display: false  

          },  

          scales: {  

            xAxes: [{  
              stacked: true,
              display: true  

            }],  

            yAxes: [{  
              stacked: true,
              display: true  

            }],  

          }  

        }  

      });  
    }
}  
