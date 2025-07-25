import { Component, ViewChild } from '@angular/core';
import { SecondaryButtonComponent } from "../../_components/secondary-button/secondary-button.component";
import { PrimaryButtonComponent } from "../../_components/primary-button/primary-button.component";
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Certificado } from '../../interfaces/certificado';
import { CertificadoService } from '../../_services/certificado.service';

import { v4 as uuidv4 } from 'uuid'
import { Router } from '@angular/router';

@Component({
  selector: 'app-certificado-form',
  imports: [SecondaryButtonComponent, PrimaryButtonComponent, FormsModule, CommonModule],
  templateUrl: './certificado-form.component.html',
  styleUrl: './certificado-form.component.css'
})
export class CertificadoFormComponent {

  constructor(private certificadoService: CertificadoService, private route: Router) { }

  @ViewChild('form') form!: NgForm

  nome: string = '';
  atividade: string = '';
  atividades: string[] = [];

  certificado: Certificado | undefined;

  formValido() {
    return this.atividades.length > 0 && this.nome.length > 0;
  }

  adicionarAtividade() {
    if (this.atividade.length == 0) {
      return
    }

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
      id: uuidv4(),
      atividades: this.atividades,
      nome: this.nome,
      dataEmissao: this.dataAtual()
    }

    this.certificadoService.adicionarCertificado(this.certificado);

    this.route.navigate(['/certificado', this.certificado.id])

    this.certificado = this.limparForm()
    this.form.resetForm;

  }


  limparForm() {
    return {
      nome: '',
      atividades: [],
      id: '',
      dataEmissao: ''
    }
  }

  dataAtual() {
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear();

    const dataFormatada = `${dia}/${mes}/${ano}`

    return dataFormatada;
  }
}
