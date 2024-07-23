import { NgClass } from '@angular/common';
import { Component, input, Input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss'
})
export class TextareaComponent {

  placeholderName = input.required<string>();

  @Input() content: string = '';
  contentEmitter = output<string>();

  emitContent() {
    this.contentEmitter.emit(this.content);
  }
}
