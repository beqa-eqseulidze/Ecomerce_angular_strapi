import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../auth.scss']
})
export class SignInComponent implements OnInit,OnDestroy {

  
  constructor(
    private authService:AuthService,
    private router:Router,
    private fb:FormBuilder
    ){}
   
   public hide:boolean=true;  
   public errorText?:string
   private unsubscribe$=new Subject()
  


  ngOnInit(): void {
  }

  showOrHidePassword(event:any):void{
    const elm=event.target as HTMLElement
    const iconText=elm.innerText
    iconText==="visibility_off"?  elm.innerText="visibility":elm.innerText="visibility_off"
    this.hide=!this.hide;    
  }

  form:FormGroup=this.fb.group({  
    identifier:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)])  
  })
  

  submit(){
   this.form.markAllAsTouched();
    if(this.form.invalid){this.errorText='fill in form correctly';return}    
    this.authService.signIn(this.form.value)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next:(res)=>{        
        this.form.reset();
        this.errorText=undefined;
        this.router.navigate([''])
      },
      error:(error) =>{        
        this.errorText=error.error.error.message
      }
    })
  }
   
    ngOnDestroy(){
      setTimeout(()=>{
        this.unsubscribe$.next(null)
        this.unsubscribe$.complete()
      },2000)
    }


}
