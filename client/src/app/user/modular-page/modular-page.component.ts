import { ActivatedRoute, Data } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-modular-page',
  templateUrl: './modular-page.component.html',
  styleUrls: ['./modular-page.component.scss']
})
export class ModularPageComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      console.log(data['pageData']);
    });
  }

}
