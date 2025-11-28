import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
export class AppComponent implements OnInit {
  title = 'Formatador ABNT';
  textoOriginal: string = '';
  textoFormatado: string = '';
  isDarkMode: boolean = false;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Verificar preferência salva ou preferência do sistema
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      this.isDarkMode = savedTheme === 'dark' || (!savedTheme && prefersDark);
      this.applyTheme();
    }
  }
  
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }
  }
  
  private applyTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const htmlElement = document.documentElement;
      if (this.isDarkMode) {
        htmlElement.setAttribute('data-theme', 'dark');
        htmlElement.classList.add('dark-mode');
      } else {
        htmlElement.setAttribute('data-theme', 'light');
        htmlElement.classList.remove('dark-mode');
      }
    }
  }
  
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
