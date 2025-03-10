import { Component } from '@angular/core';
import { Login } from '../auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import AuthService from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authForm: FormGroup 
  filename: string='';
  filesize: number=0;
  tailleInvalid: boolean=false;
  show: boolean=false;
  message: any;
  showError: boolean=false;
  data:any
  number: any;
  disabled: boolean=false;
  loginUser:Login= new Login()
 
   constructor(private formBuilder: FormBuilder,private authService: AuthService, private router:Router) { 


    this.authForm = this.formBuilder.group({
    
      email: ["",Validators.required,Validators.email],
      password: ["",Validators.required ,Validators.minLength(6), Validators.maxLength(20)],
      rememberMe: [""],    

  
    });
    
  }  
  ngOnInit(): void {
    
   
  }
  login(){
    this.loginUser.email=this.authForm.value?.email
    this.loginUser.password=this.authForm.value?.password
    this.authService.loginUser(this.loginUser).subscribe(data=>{
      if (data.role=="admin"){this.StoreCredentials(data)
        this.router.navigateByUrl('/home')
    }
    else{
       this.showError=true

       this.message=" you are not superUser"
    }
      
    })}
   

    StoreCredentials(user:any){ 
      localStorage.setItem('token',user?.access_token)
      localStorage.setItem('id',user?.userId)
      document.cookie = "token=" + user.access_token + ";  Max-Age=" + user.expiresIn + "; path=/"; 
          
}
}
