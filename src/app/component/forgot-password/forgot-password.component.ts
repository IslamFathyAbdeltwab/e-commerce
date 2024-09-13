import { Component, HostListener, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { scan } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  steps:number=1
  isloading=false;
  msgerr:string=""
  error:boolean=false;
  sucmsg:string=``
  disable:boolean=false;
  
  success:boolean=false
  private readonly _Router=inject(Router)
  private readonly _AuthService=inject(AuthService)

  postemail:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])
  })

  verifyCode:FormGroup=new FormGroup({
    resetCode:new FormControl (null,[Validators.required,Validators.pattern(/^[0-9]{6}$/)])
  })

  resetPassword:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword:new FormControl (null,[Validators.required,Validators.pattern(/^\w{6,20}$/)])
  })

  
  
  emailVerfiy():void{ 
   if(this.postemail.valid){
    this.disable=true
    this.isloading=true;
    let emailvalue=this.postemail.get("email")?.value;
    this.resetPassword.get("email")?.patchValue(emailvalue)
    this._AuthService.sendEmail(this.postemail.value).subscribe(
      {
       
        next:(res)=>{

          if(res.statusMsg=="success"){
            
             this.steps=2;
             this.disable=false;
            
            this.isloading=false
            
            this.sucmsg=res.message
           
            this.success=true
            setTimeout(() => {
              
              this.success=false
            }, 4000)
            
          }

          
        },
        error:(err)=>{
          this.isloading=false
          this.msgerr=err.error.message
          this.error=true
          setTimeout(() => {
            this.error=false
          }, 15000);

          // must here if have a error show user it 
          
          console.log("errors",err);
        }
      }
    )
   }
   else{
    this.error=true
    this.msgerr="none valid email"

   }
  }
  codeverfiy():void{
    
   
    this.error=false
    if(this.verifyCode.valid){
      this.isloading=true;
      
     
    this._AuthService.sendcode(this.verifyCode.value).subscribe({
      next:(res)=>{
       
        this.isloading=false
        if(res.status=="Success"){
          this.steps=3
        }
      },
      error:(err)=>{
        this.isloading=false
        this.error=true
        // must here if have a error show user the error to know it
        console.log("err",err)
        this.msgerr=err.error.message
      }
    })
    }
    else{
      this.error=true
      this.msgerr="none valid code "
    }
  }
  resetpassword():void{
    
    if(this.resetPassword.get("newPassword")?.valid){
      
      this.error=false
    }
    if(this.resetPassword.valid){
      this.isloading=true;
      this._AuthService.resetPassword(this.resetPassword.value).subscribe({
        next:(res)=>{

          console.log(res)
          // must here store token in api 
          // localStorage.setItem("userToken",res.token)
          // do loadin in button
          // navegate user to home or login
          this._Router.navigate(["/login"])
          this.isloading=false
        },
        error:(err)=>{
          console.log(err)
          this.isloading=false
          // must here if have error show user it
        }
      })
    }
    else{
     this.error=true
     
    this.msgerr="none valid password min 3 max 20"
  

    }
  }
  // reserPassword():void{
  //   this._AuthService.)
  // }

}
