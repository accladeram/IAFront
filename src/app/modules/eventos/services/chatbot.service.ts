import { Injectable } from '@angular/core';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  private messages: Message[] = [];

  constructor() { }

  getMessages(): Message[] {
    return this.messages;
  }

  getBotResponse(userMessage: string): string {
    const message = userMessage.toLowerCase();

    // Respuestas predefinidas
    const responses = {
      saludos: [
        '¡Hola! ¿Cómo estás? 😊',
        '¡Hola! Es un placer saludarte 👋',
        '¡Hola! ¿En qué puedo ayudarte hoy?'
      ],
      despedidas: [
        '¡Hasta luego! Que tengas un excelente día 👋',
        '¡Adiós! Espero haberte ayudado 😊',
        '¡Nos vemos! No dudes en volver si necesitas algo'
      ],
      ayuda: [
        'Estoy aquí para ayudarte. Puedes preguntarme sobre diversos temas 🤔',
        'Puedo ayudarte con información general, responder preguntas o simplemente charlar 💬',
        '¿Hay algo específico en lo que te gustaría que te ayude?'
      ],
      tiempo: [
        'No tengo acceso a información meteorológica en tiempo real, pero espero que tengas buen clima ☀️',
        'Para información del tiempo te recomiendo consultar una app meteorológica 🌤️'
      ],
      default: [
        'Interesante... cuéntame más sobre eso 🤔',
        'Entiendo. ¿Hay algo más en lo que pueda ayudarte?',
        'Esa es una buena pregunta. ¿Podrías darme más detalles?',
        'Me parece muy interesante lo que dices 💭',
        'Gracias por compartir eso conmigo. ¿Qué más te gustaría saber?'
      ]
    };

    // Detectar tipo de mensaje
    if (this.containsWords(message, ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'hey', 'saludos'])) {
      return this.getRandomResponse(responses.saludos);
    }

    if (this.containsWords(message, ['adiós', 'hasta luego', 'nos vemos', 'chau', 'bye', 'hasta pronto'])) {
      return this.getRandomResponse(responses.despedidas);
    }

    if (this.containsWords(message, ['ayuda', 'ayudar', 'qué puedes hacer', 'cómo funciona', 'help'])) {
      return this.getRandomResponse(responses.ayuda);
    }

    if (this.containsWords(message, ['tiempo', 'clima', 'lluvia', 'sol', 'temperatura'])) {
      return this.getRandomResponse(responses.tiempo);
    }

    if (this.containsWords(message, ['gracias', 'thank you', 'muchas gracias'])) {
      return '¡De nada! Es un placer ayudarte 😊';
    }

    if (this.containsWords(message, ['nombre', 'cómo te llamas', 'quién eres'])) {
      return 'Soy tu asistente virtual. Puedes llamarme Bot 🤖';
    }

    if (this.containsWords(message, ['hora', 'qué hora es'])) {
      const now = new Date();
      return `Son las ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} ⏰`;
    }

    // Respuesta por defecto
    return this.getRandomResponse(responses.default);
  }

  private containsWords(message: string, words: string[]): boolean {
    return words.some(word => message.includes(word));
  }

  private getRandomResponse(responses: string[]): string {
    return responses[Math.floor(Math.random() * responses.length)];
  }

}
