import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-delete',
  templateUrl: './btn-delete.component.html',
  styleUrls: ['../buttons.scss']
})
export class BtnDeleteComponent implements OnInit {
 @Input() id?:number
  constructor(
    
  ) { }

  ngOnInit(): void {
  }
  delete():void{

  }
}
