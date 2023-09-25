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
} from '@angular/core';
import { NgImageSliderModule } from 'ng-image-slider';
const images = [
  {
    imgMedumeUrl: 'https://placehold.jp/300x350.png',
    alt: 'some image',
    title: 'some title',
  },
  {
    imgMedumeUrl: 'https://placehold.jp/300x350.png',
    alt: 'some image',
    title: 'some title',
  },
  {
    imgMedumeUrl: 'https://placehold.jp/300x350.png',
    alt: 'some image',
    title: 'some title',
  },
  {
    imgMedumeUrl: 'https://placehold.jp/300x350.png',
    alt: 'some image',
    title: 'some title',
  },
  {
    imgMedumeUrl: 'https://placehold.jp/300x350.png',
    alt: 'some image',
    title: 'some title',
  },
  {
    imgMedumeUrl: 'https://placehold.jp/300x350.png',
    alt: 'some image',
    title: 'some title',
  },
  {
    imgMedumeUrl: 'https://placehold.jp/300x350.png',
    alt: 'some image',
    title: 'some title',
  },
  {
    imgMedumeUrl: 'https://placehold.jp/300x350.png',
    alt: 'some image',
    title: 'some title',
  },
  {
    imgMedumeUrl: 'https://placehold.jp/300x350.png',
    alt: 'some image',
    title: 'some title',
  },
  {
    imgMedumeUrl: 'https://placehold.jp/300x350.png',
    alt: 'some image',
    title: 'some title',
  },
  {
    imgMedumeUrl: 'https://placehold.jp/300x350.png',
    alt: 'some image',
    title: 'some title',
  },
  {
    imgMedumeUrl: 'https://placehold.jp/300x350.png',
    alt: 'some image',
    title: 'some title',
  },
  {
    imgMedumeUrl: 'https://placehold.jp/300x350.png',
    alt: 'some image',
    title: 'some title',
  },
  {
    imgMedumeUrl: 'https://placehold.jp/300x350.png',
    alt: 'some image',
    title: 'some title',
  },
  {
    imgMedumeUrl: 'https://placehold.jp/300x350.png',
    alt: 'some image',
    title: 'some title',
  },
  {
    imgMedumeUrl: 'https://placehold.jp/300x350.png',
    alt: 'some image',
    title: 'some title',
  },
];

@Component({
  selector: 'app-carusel',
  template: `
    <ng-container
      [ngTemplateOutlet]="custemWrapper || defaultWrapper"
      [ngTemplateOutletContext]="{ $implicit: imagesObjects }"
      ]
    >
    </ng-container>

    <ng-template #defaultWrapper>
      <div class="wrapper" [style]="wrapperStyles">
        <div class="cards" [ngStyle]="{ gap: cardGap }" #cardsContainer>
          <div
            class="card"
            [ngStyle]="{ 'min-width': width, height: height }"
            *ngFor="let image of imagesObjects; let i=index"
          >
            <img
              class="card-image"
              [src]="image.imgMedumeUrl"
              [alt]="image.alt"
            />
            <div class="description">
              card: {{i+1}}
            </div>
          </div>
        </div>
        <img
          class="arrow-left"
          [src]="arrowLeft"
          alt="arrow left"
          [style]="arrowLeftStyle"
          (click)="ClickSlid('left')"
        />
        <img
          class="arrow-right"
          [src]="arrowRight"
          alt="arrow right"
          [style]="arrowRightStyle"
          (click)="ClickSlid('right')"
        />
      </div>
    </ng-template>
  `,
  styles: [
    `
      * {
        box-sizing: border-box;
        margin:0;
        padding:0;
      }
      .wrapper {
        position: relative;
        /* border:1px solid green;     */
      }
      .cards {
        display: flex;
        flex-wrap: noWrap;
        overflow-x: auto;
        outline:1px solid red;
      }
      .cards::-webkit-scrollbar {
        height: 0;
        /* height: 5px;
        background: gray; */
      }
      /* .cards::-webkit-scrollbar-track {
        --webkit-box-shadow: inset 0 0 6px green;
      }
      .cards::-webkit-scrollbar-thumb {
        background: red;
        outline: 1px solid orange;
        width: 10px;
      } */
      .card {
        background: blue;
      }
      .card-image {
        width: 100%;
        display: block;
      }
      .arrow-left,
      .arrow-right {
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
        width: 20px;
      }
      .arrow-left {
        left: 2%;
      }
      .arrow-right {
        right: 2%;
      }
    `,
  ],
})
export class CaruselComponent implements OnInit, AfterViewInit {
  @Input() imagesObjects: any = images;
  @Input() wrapperStyles: string = 'width:100%; padding:0 10px;'; // wrapper container can take custom styles
  @Input() custemWrapper?: TemplateRef<any>;
  @Input() heightRatio: number = 1.5; // card height ratio compare to width
  @Input() imageQuantity: number = 5; // how many image must be in a view;
  @Input() gap: number = 10; // gap in "px" between images;
  @Input() arrowLeft: string = 'assets/slider-arrow-right.png'; //arrow left image src in string format;
  @Input() arrowRight: string = 'assets/slider-arrow-right.png'; //arrow right image src instring format;
  @Input() arrowLeftStyle: string = ''; //arrow left image style in string format;
  @Input() arrowRightStyle: string = ''; //arrow right image style in string format;
  @Input() slidStep: number = 2; //how many card slide pre click;
  @Input() smooth: boolean = true; // slider after click will be smooth or not;
  @Input() speed: number = 1; //carusel speed;
  @Input() autoPlay:boolean=true // autoplay ;
  @Input() autoPalayInterval:number=5000// auto slider interval in miliseconds 

  public CardsContainerWidth: number = 0;
  public width?: string;
  public height?: string;
  public widthN: number = 1;
  public heightN: number = 1;
  private cardsContainer!:HTMLElement;
  cardGap = this.gap + 'px';
  private isReseted:boolean=false;

  constructor() {}  
  @ViewChild('cardsContainer') el!: ElementRef;
  @HostListener('window:resize') resize(): void {
    this.setDimension();
    this.slidReset();
  }

  ngOnInit(): void {
    if(this.autoPlay){};    
  }


  ngAfterViewInit(): void {
    this.cardsContainer=this.el.nativeElement;
    this.setDimension();    
    this.AutoSlide();

  }

  // Set card conatiner width and height dynamically;
  private setDimension(): void {    
    //calculate card container width dynamically;
    this.widthN =
      (this.cardsContainer.offsetWidth -
        (this.imageQuantity - 1) * this.gap) /
      this.imageQuantity;
    this.heightN = this.widthN * this.heightRatio;
    this.width = this.widthN + 'px';
    this.height = this.heightN + 'px';
  }
  //slid handler function:
  private slid( direction?:'left' ): void {   
    const stap:number =(this.widthN + this.gap) * this.slidStep;
     if (!this.smooth) {
       direction ? (this.cardsContainer.scrollLeft -= stap) : (this.cardsContainer.scrollLeft += stap);
     } else {
      const move = () =>
       direction ? (this.cardsContainer.scrollLeft -= 1) : (this.cardsContainer.scrollLeft += 1);
       let currentStep = 0;
       const interval = setInterval(
         () => {
           if (currentStep >=stap) {
             clearInterval(interval);
             return;
           }
           move();
           currentStep += 1;
           if(this.isRight()){
            this.isReseted=true; 
            clearInterval(interval); 
            setTimeout(()=>{
              this.slidReset();
            },this.autoPalayInterval)            
          }  
         },
         // input speed argument must be between 1 and 10 atherwise it will be 1 or 10
         this.speed > 10 ? 10 : this.speed < 1 ? 1 : this.speed
       );
     }
   }

  //slider main function:
  public ClickSlid( direction: string ): void { 
    direction==='left'? this.slid(direction):this.slid()  
  //  const stap:number =(this.widthN + this.gap) * this.slidStep;
  //   if (!this.smooth) {
  //     direction === 'right' ? (this.cardsContainer.scrollLeft += stap) : (this.cardsContainer.scrollLeft -= stap);
  //   } else {
  //     const move = () =>
  //       direction === 'right' ? (this.cardsContainer.scrollLeft += 1) : (this.cardsContainer.scrollLeft -= 1);
  //     let currentStep = 0;
  //     const interval = setInterval(
  //       () => {
  //         if (currentStep >=stap) {
  //           clearInterval(interval);
  //           return;
  //         }
  //         move();
  //         currentStep += 1;
  //       },
  //       // input speed argument must be between 1 and 10 atherwise it will be 1 or 10
  //       this.speed > 10 ? 10 : this.speed < 1 ? 1 : this.speed
  //     );
  //   }
  }

  //Reset slider position ;
  public slidReset():void{ 
    this.cardsContainer.scrollLeft=0;
  }

  //Auto slide ;
  public AutoSlide():void{
    if(this.autoPlay){
      this.isReseted=false;      
      // const move=()=>this.cardsContainer.scrollLeft += 1;
      const stap:number =(this.widthN + this.gap) * this.slidStep;
      const interval=setInterval(()=>{  
        this.slid();             
        // let currentStep=0;
        // const interval2=setInterval(()=>{
        //   if(currentStep>=stap){
        //     clearInterval(interval2)
        //   }
        //   //  move(); 
        //    currentStep+=1;      
        //   if(this.isRight()){
        //       this.isReseted=true; 
        //       clearInterval(interval2); 
        //       setTimeout(()=>{
        //         this.slidReset();
        //       },this.autoPalayInterval)            
        //     }      
        // },this.speed > 10 ? 10 : this.speed < 1 ? 1 : this.speed);  
        
      },(this.isReseted?this.autoPalayInterval*2+stap:this.autoPalayInterval+stap))
    }
  }

  // if cards container is right conner returns true atherwise false;
private isRight():boolean{
  const cards=this.cardsContainer;
  if(!cards) return false;
  return (cards.scrollLeft+cards.clientWidth)===cards.scrollWidth
}


}
