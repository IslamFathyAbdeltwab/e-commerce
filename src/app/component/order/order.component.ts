import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../core/services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit{
  private readonly _OrderService=inject(OrderService)
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  carid!:string |null
  loading:boolean=false

  orders:FormGroup=new FormGroup({
    details:new FormControl(null,[Validators.required]),
    phone:new FormControl(null,[Validators.required]),
    city:new FormControl(null,[Validators.required])
  })

ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(p)=>{
      this.carid=p.get("cid")
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
pay():void{
  this.loading=true

if(this.orders.valid){
  this._OrderService.sendrequest(this.carid,this.orders.value).subscribe({
    next:(res)=>{
      if(res.status=="success"){
        window.open(res.session.url,"_self")
      }
      this.loading=false
      console.log(res)
    },
    error:(err)=>{
      console.log(err)
      this.loading=false
    }
  })
}
else{
 this.orders.markAllAsTouched()
 this.loading=false
}
}
  

}
