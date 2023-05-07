import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCpfCnpjMask]',
})
export class CpfCnpjMaskDirective {
  constructor(private el: ElementRef) {}
  @HostListener('keyup', ['$event.target.value'])
  onKeyUp(value: string) {
    const cleanValue = value.replace(/[^\d]/g, '');
    let formattedValue = '';

    if (cleanValue.length <= 11) {
      formattedValue = this.CpfRegEx(cleanValue);
    } else {
      formattedValue = this.CnpjRegEx(cleanValue);
    }

    this.el.nativeElement.value = formattedValue;
  }

  private CpfRegEx(cpf: string): string {
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf;
  }

  private CnpjRegEx(cnpj: string): string {
    cnpj = cnpj.replace(/(\d{2})(\d)/, '$1.$2');
    cnpj = cnpj.replace(/(\d{3})(\d)/, '$1.$2');
    cnpj = cnpj.replace(/(\d{3})(\d)/, '$1/$2');
    cnpj = cnpj.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    return cnpj;
  }
}

//regex para pattern validators
export const CpfCnpjREGEX =
  /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/;
