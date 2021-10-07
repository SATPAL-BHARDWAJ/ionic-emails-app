import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-email',
  templateUrl: './create-email.page.html',
  styleUrls: ['./create-email.page.scss'],
})
export class CreateEmailPage implements OnInit {

  showOtherTo: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
