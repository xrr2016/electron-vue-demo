import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/interval'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/takeWhile'
import 'rxjs/add/operator/do'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todo = ''
  time = null
  maxTime = this.time ? this.time * 60 * 1000 : 100
  curTime = 100
  
  start() {
    this.curTime = 0
    const interval = Observable.interval(1000)
    interval
      .takeWhile(_ => !this.isFinished)
      .do(i => {
        this.curTime += 1000
      })
      .subscribe()
  }

  reset() {
    this.curTime = 0
  }

  get isStarted() {
    return this.curTime > 0
  }

  get isFinished() {
    return this.time && this.curTime >= this.maxTime
  }
}
