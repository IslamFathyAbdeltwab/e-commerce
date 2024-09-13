import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../core/services/categories.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../core/services/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  private readonly _ActivatedRoute=inject(ActivatedRoute);
  private readonly _ProductService=inject(ProductService);
  private readonly _CartService=inject(CartService);
  private readonly _ToastrService=inject(ToastrService);
  productid:any=""
  productdata:Iproduct|null=null
  images:any
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplayHoverPause:true,
    dots: false,
    autoplay:true,
    autoplayTimeout:2500,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {  
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

 ngOnInit(): void {
   this._ActivatedRoute.paramMap.subscribe({
    next:(pid)=>{
     this.productid=pid.get("pid")
     this._ProductService.getSpcificProduct(this.productid).subscribe({
      next:(res)=>{
        
        this.productdata= res.data
        this.images=res.data.images
      }, 
      error:(err)=>{
          console.log(err)
      }
     })
    }
   })
  


 }
 addtocart(id:string){
  this._CartService.addProductToCart(id).subscribe({
    next:(res)=>{
      console.log("res",res)
      this._ToastrService.success("add successfuly to your cart")
    },
    error:(err)=>{
      console.log("error",err)
    }
  })
  }
}
