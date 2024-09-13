import { Component, inject, OnInit } from '@angular/core';
import { HomeService } from '../../core/services/home.service';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../core/services/categories.service';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { SearchPipe } from '../../core/search.pipe';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wish-list.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports:[CarouselModule,RouterLink,SearchPipe,FormsModule,NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit  {
 private readonly _CategoriesService=inject(CategoriesService)
 private readonly _HomeService=inject(HomeService)
 private readonly _CartService=inject(CartService)
 private readonly _ToastrService=inject(ToastrService)
 private readonly _WishListService=inject(WishListService)
 
 searchterm:string=""
 productData:any;
 idsubscribe!:Subscription
 categriesData:any

 customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  autoplayHoverPause:true,
  dots: false,
  autoplay:true,
  autoplayTimeout:3000,
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
maincustomOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  autoplay:true,
  autoplayTimeout:3000,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 1
    },
    740: {
      items: 1
    },
    940: {
      items: 1
    }
  },
  nav: true
}


ngOnInit(): void {
   this._WishListService.getWishList().subscribe({
    next:(res)=>{
    
      for(let i=0;i<res.data.length;++i){
        this._WishListService.wishListItems.push(res.data[i]._id)
        
        console.log(res.data)
      }
   
      console.log("herrrrrr",res.data)
      
    }
  })
 
 this.idsubscribe= this._HomeService.homeProducts().subscribe({
    next:(res)=>{
      // for(let i=0;i<res.data.length;++i){
      //   this.isInWishList(res.data[i].id)
      // }
      this.productData=res.data
      console.log("home product",this.productData)
     
      
    },
    error:(err)=>{
      console.log(err)
    }
  })
  this._CategoriesService.getAllCategories().subscribe({
    next:(res)=>{
      this.categriesData=res.data
        console.log("categories data",this.categriesData)
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
ngOnDestroy(): void {
  
  this.idsubscribe?.unsubscribe()

}
addtocart(id:string){
this._CartService.addProductToCart(id).subscribe({
  next:(res)=>{
    console.log("res",res)
    this._ToastrService.success("add successful to your cart")
    this._CartService.cartNumber.next(res.numOfCartItems)


  },
  error:(err)=>{
    console.log("error",err)
    this._ToastrService.error("Do not add  to your cart")
  }
})
}
cartdata!:any
// putproductinwish(pid:string){
// this._WishListService.putInWishList(pid).subscribe({
//   next:(res)=>{
//     this._WishListService.wishListItems=res.data
    
//     console.log(res)
//     this._CartService.getproducttodisplay().subscribe({
//       next:(res)=>{
//         this.cartdata=res.data
//       }
//     })

//   },
//   error:(err)=>{
//     console.log(err)
//   }
// })
// }

toggle(id:string){
 
if(this.isInWishList(id)){
  this._WishListService.removeProduct(id).subscribe({
    next:(res)=>{
      console.log("removeadd successfuly im islam")
      this._ToastrService.error("removed form your wishList")
      console.log(res.data)
      this._WishListService.wishListItems=res.data
      
    },
    error:(err)=>{
      console.log(err)  
    }
  })
  
}
else{
  this._WishListService.putInWishList(id).subscribe({
    next:(res)=>{
      console.log("adddddded successfuly im islam")
      this._ToastrService.success("added success to your wishList")

      console.log(res)
      this._WishListService.wishListItems=res.data
      console.log( this._WishListService.wishListItems)

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