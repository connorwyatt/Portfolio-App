import {Directive, ElementRef, Input, OnChanges, Renderer, SimpleChanges} from '@angular/core';
import {CwIconService} from '../../services';

@Directive({selector: '[cwIcon]'})
export class CwIconDirective implements OnChanges {
  @Input() private cwIcon: string;

  constructor(
      private iconService: CwIconService, private elementRef: ElementRef,
      private renderer: Renderer) {}

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['cwIcon']) {
      this.setIcon(this.cwIcon);
    }
  }

  private setIcon(iconName: string): void {
    this.iconService.getIcon(iconName).subscribe((svg: SVGElement) => {
      if (svg) {
        this.elementRef.nativeElement.innerHtml = '';
        this.renderer.projectNodes(this.elementRef.nativeElement, [svg]);
      }
    });
  }
}
