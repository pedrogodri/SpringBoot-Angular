import { Component } from '@angular/core';
import { Cliente } from '../model/Cliente';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent {

  // Obj do tipo cliente
  cliente = new Cliente();

  //Váriavel para visibilidade dos botões
  btnCadastro:Boolean = true

  // JSON de clientes
  clientes:Cliente[] = [];

  // Construtor
  constructor(private servico:ClienteService) {}

  // Método de seleção
  selecionar():void {
    this.servico.selecionar()
    .subscribe(retorno => this.clientes = retorno);
  }

  // Método de inicialização
  ngOnInit(){
    this.selecionar();
  }
}
