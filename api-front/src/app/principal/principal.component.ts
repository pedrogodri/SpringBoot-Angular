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

  // Método para editar clientes
  editar():void {
    this.servico.editar(this.cliente)
    .subscribe(retorno => {

      // Obter posição do vetor onde está o cliente
      let posicao = this.clientes.findIndex(obj => {
        return obj.codigo == retorno.codigo
      });

      // Alterar os dados do cliente no vetor
      this.clientes[posicao] = retorno;

      // Limpar formuçário
      this.cliente = new Cliente();

      // Visibilidade dos botões
      this.btnCadastro = true;

      // Visibilidade da tabela
      this.tabela = true;

      // Mensagem
      alert('Cliente alterado com sucesso');

    });
  }

  // Método para remover clientes
  remover():void {
    this.servico.remover(this.cliente.codigo)
    .subscribe(retorno => {

      // Obter posição do vetor onde está o cliente
      let posicao = this.clientes.findIndex(obj => {
        return obj.codigo == this.cliente.codigo
      });

      // Remover liente do vetor
      this.clientes.splice(posicao, 1);

      // Limpar formuçário
      this.cliente = new Cliente();

      // Visibilidade dos botões
      this.btnCadastro = true;

      // Visibilidade da tabela
      this.tabela = true;

      // Mensagem
      alert('Cliente removido com sucesso');

    });
  }

  // Método de inicialização
  ngOnInit(){
    this.selecionar();
  }
}
