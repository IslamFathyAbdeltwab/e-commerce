import { Component, inject, OnInit } from '@angular/core';
import { WishListService } from '../../core/services/wish-list.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favirote',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './favirote.component.html',
  styleUrl: './favirote.component.scss'
})
export class FaviroteComponent implements OnInit {

  private readonly _WishListService=inject(WishListService)
  private readonly _CartService=inject(CartService)
  private readonly _ToastrService=inject(ToastrService)
  productData:any

ngOnInit(): void {
  this._WishListService.getWishList().subscribe({
    next:(res)=>{
      console.log(res)
      this.productData=res.data
   

    },
    error:(err)=>{
      console.log(err)
    }
  })
}
addtocart(id:string):void{
this._CartService.addProductToCart(id).subscribe({
  next:(res)=>{
    console.log(res)
    this._ToastrService.success(res.message)
    this._CartService.cartNumber.next(res.numOfCartItems)

  },
  error:(err)=>{
    console.log(err)
  }
})
}
removeformwishlist(id:string){
  this._WishListService.removeProduct(id).subscribe({
    next:(res)=>{
    this._WishListService.wishListItems=res.data
       this._ToastrService.error("removed  form your wishList")

      console.log("removed form wish list",res)
      this._WishListService.getWishList().subscribe({
        next:(res)=>{
          console.log(res)
          this.productData=res.data
    
        },
        error:(err)=>{
          console.log(err)
        }
      })
      
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
}
