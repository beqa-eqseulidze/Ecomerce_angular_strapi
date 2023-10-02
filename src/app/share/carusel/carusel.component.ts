import {
  AfterContentInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { NgImageSliderModule } from 'ng-image-slider';

const dummyProducts = [
  {
  id:26,
  title:"product title",
  imgUrl:"https://placehold.jp/300x350.png",
  alt:'some text',
  price:80,
  oldPrice:100
  },
  {
  id:26,
  title:"product title",
  imgUrl:"https://placehold.jp/300x350.png",
  alt:'some text',
  price:80,
  oldPrice:100
  },
  {
  id:26,
  title:"product title",
  imgUrl:"https://placehold.jp/300x350.png",
  alt:'some text',
  price:80,
  oldPrice:100
  },
  {
  id:26,
  title:"product title",
  imgUrl:"https://placehold.jp/300x350.png",
  alt:'some text',
  price:80,
  oldPrice:100
  },
  {
  id:26,
  title:"product title",
  imgUrl:"https://placehold.jp/300x350.png",
  alt:'some text',
  price:80,
  oldPrice:100
  },
  {
  id:26,
  title:"product title",
  imgUrl:"https://placehold.jp/300x350.png",
  alt:'some text',
  price:80,
  oldPrice:100
  },
  {
  id:26,
  title:"product title",
  imgUrl:"https://placehold.jp/300x350.png",
  alt:'some text',
  price:80,
  oldPrice:100
  },
  {
  id:26,
  title:"product title",
  imgUrl:"https://placehold.jp/300x350.png",
  alt:'some text',
  price:80,
  oldPrice:100
  },
  

];

// interface product{
 //  id:number
//   title:string;
//   imgUrl:string;
//   alt?:string;
//   price:number;
//   oldPrice?:number;
// }


@Component({
  selector: 'app-carusel',
  templateUrl:'./carusel.component.html',
  styleUrls: ['./carusel.component.scss'],
})
export class CaruselComponent implements OnInit, AfterViewInit,OnDestroy {
  @Input() customWrapper?: TemplateRef<any>;
  @Input() descriptionContainer?:TemplateRef<any>

  @Input() products:any =dummyProducts;
  @Input() wrapperStyles: string = ""// wrapper container can take custom styles
  @Input() heightRatio: number = 1.2; // card height ratio compare to width
  @Input() imageQuantity: number = 5; // how many image must be in a view;
  @Input() gap: number = 10; // gap in "px" between images;
  @Input() arrowLeft: string = 'assets/left-arrow.png'; //arrow left image src in string format;
  @Input() arrowRight: string = 'assets/right-arrow.png'; //arrow right image src instring format;
  @Input() arrowLeftStyle: string = 'width:35px;'; //arrow left image style in string format;
  @Input() arrowRightStyle: string = 'width:35px'; //arrow right image style in string format;
  @Input() slidStep: number = 2; //how many card slide pre click;
  @Input() smooth: boolean = true // slider after click will be smooth or not;
  @Input() lowSpeed: number =1; //carusel speed min value 1;
  @Input() autoPlay:boolean=true // autoplay ;
  @Input() autoPalayInterval:number=5000// auto slider interval in miliseconds ;
  @Input() descriptionStyles:string='height:80px; display:flex; padding:5px; overflow:hidden'// ;
  @Input() cartImageUrl:string='assets/cart.png' // shoping cart image url;
  @Input() count:number=2; // how many px slid each call function slid()  recomendied value  1 or 2;

  @Output() productId=new EventEmitter<number>();

  public CardsContainerWidth: number = 0;
  public width?: string;
  public height?: string;
  public widthN: number = 1;
  public heightN: number = 1;
  public cardGap = this.gap + 'px';
  private cardsContainer!:HTMLElement;
  private caruselOn:boolean=false;
  private step!:number;
  private stepFraction!:number;
  private setInteral:any;
  

  constructor() {}  
  @ViewChild('cardsContainer') cardsElementel!: ElementRef;
  @HostListener('window:resize') resize(): void {
    this.setDimension();
    this.step=(this.widthN+this.gap) * this.slidStep;
    console.log('this.step: '+this.step);
    this.slidReset();
  }

  ngOnInit(): void {};

  ngAfterViewInit(): void {
    this.cardsContainer=this.cardsElementel.nativeElement;
    this.setDimension(); 
    this.AutoSlide();
    this.step=(this.widthN+this.gap) * this.slidStep;
    this.stepFraction=this.step%this.count
  }
   
  // Set card conatiner width and height dynamically;
  private setDimension(): void {    
   //calculate card container width dynamically;
   this.cardsContainer.style.width='100%'
    this.widthN =Math.floor((this.cardsContainer.clientWidth-(this.imageQuantity-1)*this.gap)/this.imageQuantity);
    this.cardsContainer.style.width=(this.widthN*this.imageQuantity+this.gap*(this.imageQuantity-1))+'px';
    this.heightN = this.widthN * this.heightRatio;
    this.width = this.widthN + 'px';
    this.height = this.heightN + 'px';
  }


  //slid handler; 

  private slid( direction?:string): void { 
    console.log('call slide()');    
    // If carussel is in action this function returns; 
    if(this.caruselOn) return;   
    if (!this.smooth) {
      direction ? (this.cardsContainer.scrollLeft -= this.step) : (this.cardsContainer.scrollLeft += this.step);
      if(this.isRight()) this.slidReset();
     } else {
        if(this.isRight()){
          this.slidReset();         
          return
        } 
        const move = (n:number) =>{        
          direction ? (this.cardsContainer.scrollLeft-=n) : (this.cardsContainer.scrollLeft+=n);
          currentStep+=n
        }
        let currentStep = 0;

        const interval2 = setInterval(
         () => {
          this.caruselOn=true;         
           if (currentStep===this.step-this.stepFraction){             
              move(this.stepFraction);         
              clearInterval(interval2);
              this.caruselOn=false;             
           }
           else if(!this.isRight()){         
             move(this.count);            
           }          
           if(this.isRight()){             
             clearInterval(interval2);                          
             this.caruselOn=false;               
          }       
         },
         // input speed argument must be greater than 1;
         this.lowSpeed <1? 1 :this.lowSpeed
       );
     }
   }

  //slider main function:
  public ClickSlid( direction: string ): void { 
    direction==='left'? this.slid(direction):this.slid();  
  }

  //Reset slider position ;
  public slidReset():void{ 
    this.cardsContainer.scrollLeft=0;   
  }
  //Auto slide ;
  public AutoSlide():void{
    if(this.autoPlay){
    this.setInteral=setInterval(()=>{  
           this.slid();       
      },this.autoPalayInterval) 
    }
  }
  // if cards container is right conner returns true atherwise false;
private isRight():boolean{
  const cards=this.cardsContainer;
  if(!cards) return false;
  return (cards.scrollLeft+cards.clientWidth)===cards.scrollWidth
}
 ngOnDestroy(): void {
   clearInterval(this.setInteral)
 }
}
