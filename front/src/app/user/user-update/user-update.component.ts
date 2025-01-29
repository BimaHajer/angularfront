import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent implements OnInit {
    form:FormGroup
    show: boolean=false;
    msg: string="";
  id: number=0
    constructor( private fb:FormBuilder , private userService:UserService ,private route:ActivatedRoute) { 
      this.form=this.fb.group({ 
        firstName:['',[Validators.required,Validators.minLength(3)]],
        lastName:['',[Validators.required,Validators.minLength(3)]],
        email:['',[Validators.required,Validators.email]],
        password:['',Validators.required],
        role:['']
      })
  
    }
    ngOnInit(): void {
      this.route.paramMap.subscribe(params=>{
        this.id=Number(params.get('id'))
        console.log(this.id)
         this.userService.getUserById(this.id).subscribe(res=>{
          console.log(res)
          this.form.patchValue(res)
         })
      
        
        })
      }

    

    submit(){
    this.userService.updateUser(this.form.value,this.id).subscribe(res=>{
      console.log(res)
      this.show=true
      this.msg="User added successfully"
      this.form.reset()
    })
    }

}
