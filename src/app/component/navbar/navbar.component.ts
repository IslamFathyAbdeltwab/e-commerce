import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{


  private readonly _CartService=inject(CartService)
  cartNumber:any
  signout(){
    localStorage.removeItem("userToken")
  }

ngOnInit(): void {
  this._CartService.getproducttodisplay().subscribe({
    next:(res)=>{
      this._CartService.cartNumber.next(res.numOfCartItems)
    }
  })
  this._CartService.cartNumber.subscribe({
    next:(n)=>{
      this.cartNumber=n
    }
  })
}
}
