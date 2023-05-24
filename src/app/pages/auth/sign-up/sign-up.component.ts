import { validateVerticalPosition } from '@angular/cdk/overlay';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService, UserService } from 'src/app/core/services';
import { IAuthResponse, IRegister } from '../../../core/interface/user.interface';
import { Observable, Subject, finalize, map, takeUntil, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../auth.scss']
})
export class SignUpComponent implements OnInit,OnDestroy {
  
  
  constructor(
    private authService:AuthService,
    private router:Router,
    private fb:FormBuilder,
    private http:HttpClient,
    private userService:UserService,
    private storageService:StorageService
    ){}

   showAndHide(event:any):void{
      const elm=event.target as HTMLElement      
      const iconText=elm.innerText
      if(iconText==="visibility_off"){
        elm.innerText="visibility"
        elm.parentElement?.children[0].setAttribute('type','text')
      } 
      else{
        elm.innerText="visibility_off"
        elm.parentElement?.children[0].setAttribute('type','password')
      } 
       
    }


  errorText?:string
  file?:File
  formData = new FormData();
  uploadProgress:number|null=null;
  unsubscribe$:Subject<any>=new Subject()


  upload(e:any):void{
    this.file=e.target.files[0]
    if(this.file){
      this.formData.append("ref",'plugin::users-permissions.user' ); //რომელ კოლექციაზე ვახდენთ სურათის ატვირთვას
      this.formData.append("field", 'image'); // ველის დასახელება სადაც იტვირთება სურათი
      this.formData.append("files",this.file);    // უშვალოდ სურათი რაც უნდა მიმაგრდეს ( ბინალური  )
      // this.formData.append("refId", this.colectionId); // კოლექციის რომელ ერთეულზე ხდება სურათის ატვირთვა
    }
  }

  ngOnInit(): void {
  }
  



  form:FormGroup=this.fb.group({
    username:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)]),
    confirmPassword:new FormControl('',Validators.required)
  })
  

  submit(){
    if(this.form.controls['password'].value!==this.form.controls['confirmPassword'].value) {
      this.errorText='password don\'t match'
      return
    }
    this.form.markAllAsTouched()

    if(this.form.invalid){
      this.errorText='fill in form correctly'
      return
    }    
    this.authService.register(this.form.value)
    .subscribe({
      next:(res)=>{  
        this.formData.append('refId',res.user.id.toString())       
        this.sendImage().subscribe({
          next:()=>{this.getAndSaveProfilUrl()}
        });               
        this.form.reset();
        this.errorText=undefined;
        this.router.navigate([''])
      },
      error:(error) =>{        
        this.errorText=error.error.error.message
      }
    })
  }

// ეს ფუნქცია გასაკეთებელი სერვისში 
    sendImage():Observable<any>{
     return this.http.post<any>(environment.apiUrl+'upload',this.formData,{reportProgress:true,observe:'events'})
      .pipe(takeUntil(this.unsubscribe$))
    }
      
  //get end save profilimage
  getAndSaveProfilUrl():void{
    let token=this.authService.token$.getValue();
    if(token)
    this.userService.getAndSaveOwnProfilUrl(token).subscribe({
      next:d=>this.authService.profilUrl$.next(this.storageService.profilUrl)
    })
  }


    ngOnDestroy(){
      setTimeout(()=>{
        this.authService.unsubscribe$.next(null)
        this.authService.unsubscribe$.complete();
        this.unsubscribe$.next(null)
        this.unsubscribe$.complete()
      },2000)
    }

}
