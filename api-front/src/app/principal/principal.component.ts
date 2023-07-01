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

  //Váriavel para visibilidade da tabela
  tabela:Boolean = true;

  // JSON de clientes
  clientes:Cliente[] = [];

  // Construtor
  constructor(private servico:ClienteService) {}

  // Método de seleção
  selecionar():void {
    this.servico.selecionar()
    .subscribe(retorno => this.clientes = retorno);
  }

  // Método de cadastro
  cadastrar():void {
    this.servico.cadastrar(this.cliente)
    .subscribe(retorno => {

      // Cadastrar o cliente no vetor
      this.clientes.push(retorno);

      // Limpar formulário
      this.cliente = new Cliente();

      // Mensagem
      alert("Cliente cadastrado com sucesso");
    });
  }

  // Método de selecionar cliente específico
  selecionarCliente(posicao:number):void {
    // Selecioanar cliente no vetor
    this.cliente = this.clientes[posicao];


    // Visibilidade dos botões
    this.btnCadastro = false;

    // Visibilidade da tabela
    this.tabela = false;
  }

  // Método de inicialização
  ngOnInit(){
    this.selecionar();
  }
}
