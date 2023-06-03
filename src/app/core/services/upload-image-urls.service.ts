import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadImageUrlsService {

  imageUrls$=new BehaviorSubject<string[]>([])

}
