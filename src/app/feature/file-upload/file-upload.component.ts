import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Subject, finalize, takeUntil } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { UploadImageUrlsService } from 'src/app/core/services/upload-image-urls.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  @Input() requiredFileType?:string

  @Input() colection!:string
  @Input() colectionId!:string
  @Input() fieldName!:string
  
  file?:File 
  unsubscribe$:Subject<any>=new Subject()
  uploadProgress:number|null=null;


  constructor(
    private http:HttpClient,
    private uploadImageUrlsService:UploadImageUrlsService
  ) { }


//colection:string='api::product.product',colectionId:string='4',fieldName:string='image'
upload(e:any) {
  this.file = e.target.files[0];
   if (this.file) {
      const formData = new FormData();
      formData.append("ref",this.colection ); //რომელ კოლექციაზე ვახდენთ სურათის ატვირთვას
      formData.append("refId", this.colectionId); // კოლექციის რომელ ერთეულზე ხდება სურათის ატვირთვა
      formData.append("field", this.fieldName); // ველის დასახელება სადაც იტვირთება სურათი
      formData.append("files",this.file);    // უშვალოდ სურათი რაც უნდა მიმაგრდეს ( ბინალური  )
      
      // const headers = new HttpHeaders({
      //   'Authorization': `bearer ${this.token}`,      
      // });


 // პარამეტრები:url-ლინკი სტრინგად, body-FormData, options-{1-ინფორმაცია ატვირთვის პროგრესზე, 2-რას უყუროს } 
   this.http.post('http://localhost:1337/api/upload',
   formData,
  { 
    reportProgress:true,
    observe:'events'
  }   
   )
   .pipe(
    finalize(()=>this.reset())
   )
   .subscribe((d:any)=>{
        if(d.type===HttpEventType.UploadProgress){
         this.uploadProgress=Math.round(d.loaded/d.total*100)  
        }
        if(d.type===HttpEventType.Response){
           // save uploaded image urls in subject Urls$ 
          this.uploadImageUrlsService.imageUrls$.next([d.body[0].url , d.body[0].formats.thumbnail.url]);        
        }
      })
  
   }
}

  reset():void{
    this.uploadProgress=null
    this.unsubscribe$.next(null)
    this.unsubscribe$.complete()
  }

  cancelUpload() {  
    this.reset();
  }

}
