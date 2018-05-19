import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	constructor() {
	}
	
	startButton: boolean = false;
	stopButton: boolean = true;

	sec = 0;
	min = 0;
	hour = 0;


	ngOnInit() {

	}

	mytimer;

	ittimer = {
		hour: this.hour,
		min: this.min,
		sec: this.sec
	};

	start(hour: number, min: number, sec: number) {
		this.stopButton = false;
		this.startButton = true;
		if (hour >= 24) {
			hour = 23;
			min = 59;
			sec = 59;
		} else if(hour < 0 || hour == -0) {
			hour = 0;
		};
		if (min >= 60) {
			min = 59;
			sec = 59;
		} else if(min < 0 || min == -0) {
			min = 0;
		};
		if (sec >= 60) {
			sec = 59;
		} else if(sec < 0 || sec == -0) {
			sec = 0;
		};
		
		if(this.ittimer.hour == 0 && this.ittimer.min != 0) {
			this.ittimer.hour = 0;
		} else if(this.ittimer.hour == 0){
			this.ittimer.hour = hour;
		} else {
			this.ittimer.hour;
		}
		if(this.ittimer.min == 0 && this.ittimer.sec != 0) {
			this.ittimer.min = 0;
		}else if(this.ittimer.min == 0) {
			this.ittimer.min = min;
		} else {
			this.ittimer.min;
		}
		if(this.ittimer.sec == 0) {
			this.ittimer.sec = sec;
		} else {
			this.ittimer.sec;
		}
		// console.log(typeof(this.ittimer.hour));
		// console.log(this.ittimer.hour + ':' + this.ittimer.min + ':' + this.ittimer.sec);
		

		if (this.ittimer.hour != 0 || this.ittimer.min != 0 || this.ittimer.sec != 0) {
			this.mytimer = timer(1000, 1000)
				.pipe(map(() => --this.ittimer.sec))
				.subscribe((i) => {
					this.ittimer.sec = i;
					if (this.ittimer.sec === -1) {
						this.ittimer.sec = 59;
						this.ittimer.min--;
					}
					if (this.ittimer.min === -1) {
						this.ittimer.min = 59;
						this.ittimer.hour--;
					}
					if (this.ittimer.hour == 0 && this.ittimer.min == 0 && this.ittimer.sec == 0) {
						return this.mytimer.unsubscribe();
					}
				});
		}

	}

	stop(ittimer) {
		this.stopButton = true;
		this.startButton = false;
		if (this.ittimer.hour == 0 && this.ittimer.min == 0 && this.ittimer.sec == 0) {
			return ittimer;
		} else {
			return this.mytimer.unsubscribe();
		}
	}

	wait(ittimer) {
		if (this.ittimer.hour == 0 && this.ittimer.min == 0 && this.ittimer.sec == 0) {
			return ittimer;
		} else {
			return this.mytimer.unsubscribe();
		}
	}

	reset(hour, min, sec) {
		this.stopButton = true;
		this.startButton = false;
		if (this.mytimer != undefined) {
			if (this.ittimer.hour != 0) {
				this.ittimer.hour = 0;
			}
			if (this.ittimer.min != 0) {
				this.ittimer.min = 0;
			}
			if (this.ittimer.sec != 0) {
				this.ittimer.sec = 0;
			}
			this.mytimer.unsubscribe();
		}
	}
}
