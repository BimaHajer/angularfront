import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { UserService } from '../user.service';
@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css'
})
export class UserADDComponent {
  form:FormGroup
  show: boolean=false;
  msg: string="";
  constructor( private fb:FormBuilder , private userService:UserService) { 
    this.form=this.fb.group({ 
      firstName:['',[Validators.required,Validators.minLength(3)]],
      lastName:['',[Validators.required,Validators.minLength(3)]],
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
      role:['']
    })

  }
  submit(){
  this.userService.createUser(this.form.value).subscribe(res=>{
    console.log(res)
    this.show=true
    this.msg="User added successfully"
    this.form.reset()
  })
  }


}
