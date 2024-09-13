import { Component, inject, OnInit } from '@angular/core';
import { SearchPipe } from '../../core/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { HomeComponent } from '../home/home.component';
import { WishListService } from '../../core/services/wish-list.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SearchPipe,FormsModule,RouterLink,NgClass],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent   implements OnInit  {


 
 
  private readonly _ProductService=inject(ProductService)
  private readonly _CartService=inject(CartService)
  private readonly _ToastrService=inject(ToastrService)
  private readonly _WishListService=inject(WishListService)
  productData:any;
  ngOnInit(): void {
    this._ProductService.getallproduct().subscribe({
      next:(res)=>{
        this._WishListService.getWishList().subscribe({
          next:(res)=>{
            for(let i=0;i<res.data.length;++i){
              this._WishListService.wishListItems.push(res.data[i]._id)
              
              console.log(res.data)
            }
          },
          error:(err)=>{
            console.log(err)
          }
        })
        this.productData=res.data
        
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  addtocart(id:string){
  this._CartService.addProductToCart(id).subscribe({
    next:(res)=>{
      console.log(res)
      this._ToastrService.success("add successfuly to your cart")
      this._CartService.cartNumber.next(res.numOfCartItems)

    },
    error:(err)=>{
      console.log(err)
      this._ToastrService.error("Dont  add  to your cart")
    }
  })
  }
  // putproductinwish(pid:string){
   
  //   this._WishListService.putInWishList(pid).subscribe({
  //     next:(res)=>{
  //       console.log(res)    
  //       this._ToastrService.success(res.message)       
  //     },
  //     error:(err)=>{
  //       console.log(err)
  //       this._ToastrService.error(err.error)

  //     }
  //   })
  //  }
   toggle(id:string):void{
   if(this.isInWishList(id)){
    this._WishListService.removeProduct(id).subscribe({
      next:(res)=>{
        console.log(res)
        this._WishListService.wishListItems=res.data
        this._ToastrService.error("removed form your wishlist")

      },
      error:(err)=>{
        console.log(err)
      }
    })
   }
   else{
    this._WishListService.putInWishList(id).subscribe({
      next:(res)=>{
        this._WishListService.wishListItems=res.data

        this._ToastrService.success("added successfuly to your wishlist")
        console.log(res)
      },
      error:(err)=>{
        console.log(err)
      }
    })
   }
   }
   isInWishList(id:string):boolean{
    return this._WishListService.isInWishList(id)
   }
    }

   

