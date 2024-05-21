import { Component } from '@angular/core';
import { Produto } from 'src/app/interfaces/produto';
import { ProdutosService } from 'src/app/services/produtos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent {
  produtos: Produto[] = [];

  constructor(private produtosService: ProdutosService){};

  listarProdutos(): void{
    this.produtosService.listarProdutos().subscribe(
      retorno => this.produtos = retorno);
  }

  deletarProduto(id: number): void {
    Swal.fire({
      title: 'Confirmar exclusão',
      text: 'Tem certeza de que deseja excluir este produto?',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.produtosService.deletarProduto(id).subscribe(() => {
          this.listarProdutos();
          Swal.fire('Produto excluído com sucesso', '', 'success');
        });
      }
    });
  }

  atualizarProduto(produto: Produto): void {
    this.produtosService.atualizarProduto(produto).subscribe(() => {
      this.listarProdutos();
      Swal.fire('Produto atualizado com sucesso', '', 'success');
    });
  }

  ngOnInit(){
    this.listarProdutos();
  }
  

}