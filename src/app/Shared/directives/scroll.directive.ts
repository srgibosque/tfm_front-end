import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScroll]',
  standalone: true
})
export class ScrollDirective {
  private scrollThreshold = 32; 

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > this.scrollThreshold) {
      this.renderer.addClass(this.el.nativeElement, 'shadow-bottom');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'shadow-bottom');
    }
  }
}