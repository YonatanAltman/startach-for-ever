import {Component, OnInit} from '@angular/core';
import {HomeService} from "./home.service";

@Component({
  selector: 'startach-for-ever-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private _userName?: string;
  address?: string;
  count = 0;

  public get userName(): string | undefined {
    return this._userName;
  }

  public set userName(name: string | undefined) {
    this._userName = name;
  }

  constructor(private homeService: HomeService) {
  }

  ngOnInit() {
    this.generateData();
  }

  public getHomeAddress(): void {
    ++this.count;
    this.address = `Rothschild boulevard ${this.count}`;
  }

  public constructorHome(text: string): string {
    return text
  }

  private generateData() {
    this.count = 0;
  }
}
