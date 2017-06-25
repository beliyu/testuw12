import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pamti = 0;
  last= '0';
  startTime = Date.now();
  titleF = '00:00.00';
  title = '00:00.00';
  title0 = '88:88.88';
  events = [];
  s: any;
  w = false;
  hs = true;
  // source0 = Observable
  //   .interval(100)
  //   .subscribe(() => this.getls());
  source1 = Observable
    .interval(93)
    .timestamp()
    .subscribe((res) => {
      let sto: number; let stoS: string;
      let sec: number; let secS: string;
      let min: number; let minS: string;
      this.getls();
      if (this.w) {
        this.s = res.timestamp - this.startTime + this.pamti;

        sto = Math.floor(Math.floor(this.s / 10) % 100);
        stoS = (sto < 10) ? '0' + sto : '' + sto;

        sec = Math.floor(Math.floor(this.s / 1000) % 60);
        secS = (sec < 10) ? '0' + sec : '' + sec;

        min = Math.floor(Math.floor(this.s / 60000) % 60);
        minS = (min < 10) ? '0' + min : '' + min;

        if (sto < 30) {
          this.titleF = minS + ':' + secS + '.' + stoS;
          this.title = minS + ':' + secS + '.' + stoS;
        } else {
          this.titleF = minS + ':' + secS + '.' + stoS;
          this.title = minS + ' ' + secS + '' + stoS;
        }
      }
    });

  constructor() {
    this.getls();
  }

  pauza() {
    this.w = false;
    this.pamti = this.s;
    this.title = this.titleF;
    this.setls();
  }
  start() {
    this.w = true;
    this.startTime = Date.now();
    this.setls();
  }
  set() {
    this.events.unshift(this.titleF);
    this.setls();
  }
  reset() {
    this.w = false;
    this.pamti = 0;
    this.title = '00:00.00';
    this.events = [];
    this.setls();
  }
  rem(ev) {
    let i = [];
    this.events.forEach((e) => {
      if (ev !== e) { i.push(e); }
    });
    this.events = i;
    this.setls();
  }
  setls() {
    const ts = Date.now().toString();
    const obj = {
      'ts': ts,
      'w': this.w,
      'pamti': this.pamti,
      'title': this.title,
      'startTime': this.startTime,
      'events': this.events
    };
    localStorage.setItem('lsMem', JSON.stringify(obj));
    // this.last = ts;
  }
  getls() {
    const lsMem = JSON.parse(localStorage.getItem('lsMem'));
    if (lsMem && lsMem.ts !== this.last) {
      this.last = lsMem.ts;
      this.w = lsMem.w;
      this.pamti = lsMem.pamti;
      this.title = lsMem.title;
      this.startTime = lsMem.startTime;
      this.events = lsMem.events;
      console.log('ima nov:  ' + lsMem.ts);
    }
  }
}
