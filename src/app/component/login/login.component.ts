import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { error } from 'console';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _authservice=inject(AuthService)
  private readonly _Router=inject(Router)
  private readonly _ToastrService=inject(ToastrService)

  isloading:boolean=false;
  msgerr:string="";
  msgsuc:string="";
  idsubscribe!:Subscription
  show:boolean=false

  loginForm:FormGroup=this._FormBuilder.group({
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^\w{6,20}$/)]]
  })
  
  printforminfo(){
   
     if(this.loginForm.valid){
      this.isloading=true
      this.idsubscribe=this._authservice.login(this.loginForm.value).subscribe(
        {
          next:(res)=>{
            
            if(res.message=="success"){
              this.msgsuc=res.message
              this.msgerr="";
              this.isloading=false;
              localStorage.setItem("userToken",res.token)
              this._authservice.saveUserData()
              if(typeof localStorage !="undefined"){
              setTimeout(() => {
                this._Router.navigate(["/home"])
              }, 900);
            }
            }
            
          },

          error:(err)=>{
            this.isloading=false;
            this.msgerr=err.error.message

            console.log(err);
          } 
        }
       )
     }
     else{
      this.loginForm.markAllAsTouched();
      this._ToastrService.error("none valid email or password")
     }

    
  }
  handelmsg(){
    this.msgerr="";
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.idsubscribe?.unsubscribe();
  }
}
