import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../../interfaces/message';
import { ChatbotService } from '../../services/chatbot-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot-component.html',
  styleUrls: ['./chatbot-component.css'],
  imports: [FormsModule, CommonModule],
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  messages: Message[] = [];
  newMessage: string = '';
  isTyping: boolean = false;
  isChatMinimized: boolean = false;

  constructor(private chatService: ChatbotService) { }

  ngOnInit() {
    this.messages = this.chatService.getMessages();
    // Mensaje de bienvenida
    setTimeout(() => {
      this.addBotMessage('¡Hola! 👋 Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?');
    }, 500);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  async sendMessage() {
    if (this.newMessage.trim()) {
      const userMessage = this.newMessage;
      this.newMessage = '';
      this.addUserMessage(userMessage);

      this.isTyping = true;

      try {
        const botResponse = await this.chatService.getBotResponse(userMessage);
        this.addBotMessage(botResponse);
      } catch {
        this.addBotMessage('No se pudo obtener respuesta.');
      } finally {
        this.isTyping = false;
      }
    }
  }

  addUserMessage(text: string) {
    const message: Message = {
      text,
      isUser: true,
      timestamp: new Date()
    };
    this.messages.push(message);
  }

  addBotMessage(text: string) {
    const message: Message = {
      text,
      isUser: false,
      timestamp: new Date()
    };
    this.messages.push(message);
  }

  toggleChat() {
    this.isChatMinimized = !this.isChatMinimized;
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch (err) { }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
