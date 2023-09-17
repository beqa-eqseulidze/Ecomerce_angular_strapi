import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, tap,concatMap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { AuthService, UserService, StorageService } from 'src/app/core/services';
import { IAuthResponse, IUserIRoleIFullImage} from 'src/app/core/interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../auth.scss']
})
export class SignUpComponent implements OnDestroy {

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private userService: UserService    
  ) { }

  showAndHide(event: any): void {
    const elm = event.target as HTMLElement
    const iconText = elm.innerText
    if (iconText === "visibility_off") {
      elm.innerText = "visibility"
      elm.parentElement?.children[0].setAttribute('type', 'text')
    }
    else {
      elm.innerText = "visibility_off"
      elm.parentElement?.children[0].setAttribute('type', 'password')
    }

  }

  public errorText?: string
  public file?: File
  private formData: FormData = new FormData();
  private uploadProgress: number | null = null;
  public unsubscribe$: Subject<any> = new Subject()


  upload(e: any): void {
    this.file = e.target.files[0]
    if (this.file) {
      this.formData.append("ref", 'plugin::users-permissions.user'); //რომელ კოლექციაზე ვახდენთ სურათის ატვირთვას
      this.formData.append("field", 'image'); // ველის დასახელება სადაც იტვირთება სურათი
      this.formData.append("files", this.file);    // უშვალოდ სურათი რაც უნდა მიმაგრდეს ( ბინალური  )
      // this.formData.append("refId", this.colectionId); // კოლექციის რომელ ერთეულზე ხდება სურათის ატვირთვა
    }
  }
  // ეს ფუნქცია გასაკეთებელი სერვისში 
  sendImage(formData: FormData): Observable<any> {
    // return this.http.post<any>(environment.apiUrl + 'upload', formData, { reportProgress: true, observe: 'events' })
    return this.http.post<any>(environment.apiUrl + 'upload', formData)
      
  }

  form: FormGroup = this.fb.group({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', Validators.required)
  })


  submit() {
    if (this.form.controls['password'].value !== this.form.controls['confirmPassword'].value) {
      this.errorText = 'password don\'t match'
      return
    }
    this.form.markAllAsTouched()

    if (this.form.invalid) {
      this.errorText = 'fill in form correctly'
      return
    }    
    this.authService.register(this.form.value)
      .pipe(
        tap((d: IAuthResponse)=>this.formData.append('refId', d.user.id.toString())),
        concatMap((d: IAuthResponse) =>this.sendImage(this.formData)),
        concatMap((d:any)=>this.userService.getAndSaveOwnRoleAndProfilUrl())       
      ).subscribe({
            next: (d:IUserIRoleIFullImage) => {
              this.authService.role$.next(d.role.name)
              this.authService.profilUrl$.next(d.image[0]?.formats.thumbnail.url)
              this.form.reset()
              this.errorText = undefined
              this.router.navigate([''])
            },
            error: (error) => {
              this.errorText = error.error.error.message
            }
        })    
  
  }

  ngOnDestroy() {    
      this.unsubscribe$.next(null)
      this.unsubscribe$.complete()
     
  }

}
