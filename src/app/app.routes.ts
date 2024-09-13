import { Routes } from '@angular/router';
import { MainlayoutComponent } from './main-layout/mainlayout/mainlayout.component';
import { HomeComponent } from './component/home/home.component';
import { BrandsComponent } from './component/brands/brands.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { ProductsComponent } from './component/products/products.component';
import { AuthlayoutComponent } from './auth-layout/authlayout/authlayout.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { CartComponent } from './component/cart/cart.component';
import { authGuard } from './core/guards/auth.guard';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { DetailsComponent } from './component/details/details.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { OrderComponent } from './component/order/order.component';
import { SpecificCategoreComponent } from './component/specific-categore/specific-categore.component';
import { FaviroteComponent } from './component/favirote/favirote.component';
import { AllordersComponent } from './component/allorders/allorders.component';

export const routes: Routes = [
    {path:"",component:AuthlayoutComponent,children:[
        {path:"",redirectTo:"login",pathMatch:"full"},
        {path:"login",component:LoginComponent,title:"login"},
        {path:"register",component:RegisterComponent,title:"register"},
        {path:"forgot",loadComponent:(()=>import('./component/forgot-password/forgot-password.component').then((c)=>c.ForgotPasswordComponent)),title:"forgot"},
    ]},
    {path:"",component:MainlayoutComponent,canActivate:[authGuard],children:[
        {path:"",redirectTo:"home",pathMatch:"full"},
        {path:"home",component:HomeComponent,title:"home"},
        {path:"cart",loadComponent:(()=>import('./component/cart/cart.component').then((c)=>c.CartComponent)),title:"cart"},
        {path:"brands",component:BrandsComponent,title:"brands"},
        {path:"categories",component:CategoriesComponent,title:"categories"},
        {path:"products",component:ProductsComponent,title:"products"},
        {path:"details/:pid",component:DetailsComponent,title:"details"},
        {path:"order/:cid",loadComponent:(()=>import('./component/order/order.component').then((c)=>c.OrderComponent)),title:"order"},
        {path:"speccategorie/:scId",component:SpecificCategoreComponent,title:"categories"},
        {path:"favirote",loadComponent:()=>import('./component/favirote/favirote.component').then((c)=>c.FaviroteComponent),title:"favirote"},
        {path:"allorders",component:AllordersComponent,title:"allorders"},
        
        {path:"**",loadComponent:(()=>import('./component/not-found/not-found.component').then((c)=>c.NotFoundComponent)),title:"notfound"}
    ]},
  
];
