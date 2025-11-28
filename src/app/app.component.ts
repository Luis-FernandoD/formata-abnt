import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Nl2brPipe } from './pipes/nl2br.pipe';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule, Nl2brPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Formatador ABNT';
  textoOriginal: string = '';
  textoFormatado: string = '';
  
  formatarTexto(): void {
    // Por enquanto, apenas copia o texto original
    // A lógica de formatação será implementada depois
    this.textoFormatado = this.textoOriginal;
  }
  
  limparTexto(): void {
    this.textoOriginal = '';
    this.textoFormatado = '';
  }
  
  copiarTextoFormatado(): void {
    if (this.textoFormatado) {
      navigator.clipboard.writeText(this.textoFormatado).then(() => {
        alert('Texto copiado para a área de transferência!');
      });
    }
  }
}
