import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges, OnInit, Output, EventEmitter} from '@angular/core';

@Directive({
  selector: '[appHighlightActive]',
  host: {'(document: keyup)': 'initKeyUp($event)'},
})


export class HighlightActiveDirective implements AfterViewInit, OnChanges, OnInit {

  @Input() selector: string = '';
  @Input() initFirst: boolean = false;
  @Input() updateView: boolean = false;
  @Input() sort!: (el1: HTMLElement, el2: HTMLElement) => number;
  @Output() onEnter = new EventEmitter<{el: HTMLElement, index: number}>();
  
  
  private index: number = 0;
  private isLoaded = false;
  private items: HTMLElement[] = [];


  constructor(private el: ElementRef) {}

ngOnInit(): void {}


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.items = this.el ? Array.from((this.el.nativeElement as HTMLElement).querySelectorAll(this.selector)): [];


      if (this.sort) {
        this.items.sort(this.sort);
      }
      if (this.initFirst && this.items?.length) {
        this.changeIndex(0);
      }
      console.log('items', this.items); }, 1000);
  }

  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['updateView'] && !changes['updateView'].firstChange) {
      setTimeout(() => this.initItems());
    }
  }

  // обновление списка карточек
  public initItems(): void {
    this.items = Array.from(
      (this.el.nativeElement as HTMLElement).querySelectorAll(this.selector)
    );

    if (this.sort) {
      this.items.sort(this.sort);
    }

    if (this.initFirst && this.items.length) {
      this.items.forEach(el => el.classList.remove('active'));
      this.index = 0;
      this.items[0].classList.add('active');
    }
  }

  // переключение выделения
  private changeIndex(shift: -1 | 1 | 0) {
    if (!this.items.length) return;

    const current = this.items.findIndex(el => el.classList.contains('active'));

    if (current !== -1) {
      this.items[current].classList.remove('active');
      this.index = current;
    }

    this.index += shift;

    if (this.index < 0) this.index = this.items.length - 1;
    if (this.index >= this.items.length) this.index = 0;

    this.items[this.index].classList.add('active');

    this.items[this.index].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest'
    });
  }

  initKeyUp(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') 
      {this.changeIndex(1);} 
    else if (event.key === 'ArrowLeft') 
       {this.changeIndex(-1);} 
    else if (event.key === 'Enter') 
       
      
      {this.onEnter.emit({
        el: this.items[this.index], 
        index: this.index
      });
    }
  }
}
