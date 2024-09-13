import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _AuthService=inject(AuthService)
  private readonly _Router=inject(Router)
  reqData:any=[];
  isloading:boolean=false;
  msgerr:string="";
  msgsuc:string=""
  idsubscribe!:Subscription;
  show:boolean=false
  reshow:boolean=false
  registerForm:FormGroup=this._FormBuilder.group(
    
      {
       name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
       email:[null,[Validators.required,Validators.email]],
       phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
       password:[null,[Validators.required,Validators.pattern(/^\w{6,20}$/)]],
       rePassword:[null]
      },{validators:[this.confirmPassword]}
    
     
  )

  printforminfo(){
    if(this.registerForm.valid ){
      this.isloading=true
      this.idsubscribe= this._AuthService.sendRegisterData(this.registerForm.value).subscribe({
        next:(res)=>{
          if(res.message=="success"){
            this.msgerr=""
            this.msgsuc=res.message;
            this.isloading=false
            if(typeof localStorage !="undefined"){
              localStorage.setItem("userToken",res.token)
              setTimeout(() => {
               this._Router.navigate(["/login"])
              }, 1000);
            }
          }
        },
        error:(err)=>{
          console.log(err)
         this.msgerr= err.error.message
         this.isloading=false
        }
      })
    }
    else{
      this.registerForm.markAllAsTouched();
    }
   
  }
  

  
  
  handelerr(){
    this.msgerr=""
  }
 

  confirmPassword(g:AbstractControl){
     if(g.get("password")?.value ===g.get("rePassword")?.value){
      return null;
     }
     else{
      return {"mismatch":true}
     }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.idsubscribe?.unsubscribe();
  }
}
