import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneMask]',
})
export class PhoneMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('keyup', ['$event.target.value'])
  onInputChange(value: string) {
    let phoneNumber = value.replace(/\D/g, '');

    // telefone fixo
    if (phoneNumber.length === 10) {
      phoneNumber = phoneNumber.replace(
        /^(\d{2})(\d{4})(\d{4})$/,
        '($1) $2-$3'
      );
      //celular
    } else if (phoneNumber.length === 11) {
      phoneNumber = phoneNumber.replace(
        /^(\d{2})(\d{5})(\d{4})$/,
        '($1) $2-$3'
      );
    }

    this.el.nativeElement.value = phoneNumber;
  }
}
