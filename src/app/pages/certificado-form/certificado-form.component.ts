import { Component } from '@angular/core';
import { SecondaryButtonComponent } from "../../_components/secondary-button/secondary-button.component";
import { PrimaryButtonComponent } from "../../_components/primary-button/primary-button.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Certificado } from '../../interfaces/certificado';

@Component({
  selector: 'app-certificado-form',
  imports: [SecondaryButtonComponent, PrimaryButtonComponent, FormsModule, CommonModule],
  templateUrl: './certificado-form.component.html',
  styleUrl: './certificado-form.component.css'
})
export class CertificadoFormComponent {
  nome: string = '';
  atividade: string = '';
  atividades: string[] = [];

  certificado: Certificado | undefined;

  formValido() {
    return this.atividades.length > 0 && this.nome.length > 0;
  }

  adicionarAtividade() {
    this.atividades.push(this.atividade);
    this.atividade = '';
  }

  excluirAtividade(index: number) {
    this.atividades.splice(index, 1);
  }

  submit() {

    if (!this.formValido) {
      return
    }
    this.certificado = {
      atividades: this.atividades,
      nome: this.nome
    }

  }
}
