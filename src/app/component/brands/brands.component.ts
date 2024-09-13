import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from '../../core/services/brand.service';
import { Iproduct } from '../../core/interfaces/iproduct';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  private readonly _BrandService=inject(BrandService)
  brandData!:any[]
ngOnInit(): void {
  this._BrandService.getbrands().subscribe({
    next:(res)=>{
      this.brandData=res.data
      console.log(res)
    },
    error:(err)=>{
      console.log(err)
    }
  })
  
}getspecficbrands(){
  this._BrandService.getspecficbrands("64089fe824b25627a25315d1").subscribe({
    next:(res)=>{
      console.log(res)
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
}
