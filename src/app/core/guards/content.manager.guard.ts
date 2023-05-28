import {inject} from '@angular/core';
import {Router} from '@angular/router';
import { StorageService } from '../services';

 export const contentManagerGuard=()=>{
    const role=inject(StorageService).Role
    const router=inject(Router)
    if(role!=='admin'){
        router.navigate([''])
        return false
    }
    return true
}