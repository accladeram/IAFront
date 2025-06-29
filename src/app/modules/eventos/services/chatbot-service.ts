import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, timeout, map } from 'rxjs/operators';
import { Message } from '../interfaces/message';

export interface ChatRequest {
  prompt: string;
}

export interface ChatResponse {
  content: string;
}

@Injectable({ providedIn: 'root' })
export class ChatbotService {
  private messages: Message[] = []
  // ✅ URL corregida para coincidir con el proxy
  private readonly API_URL = "https://4d02-190-104-20-155.ngrok-free.app/api/llm/chat/";
  private readonly REQUEST_TIMEOUT = 100000
  private conversationId: string | null = null

  constructor(private http: HttpClient) {
    // 🔍 Debug: Verificar la URL que se está usando
    console.log("🔗 API URL configurada:", this.API_URL)
  }

  getMessages(): Message[] {
    return this.messages
  }

  async getBotResponse(userMessage: string): Promise<string> {
    try {
      console.log("📤 Enviando mensaje:", userMessage)
      console.log("🎯 URL destino:", this.API_URL)
      const response = await this.getApiResponse(userMessage)
      return response
    } catch (error) {
      console.error("❌ Error al obtener respuesta de la API:", error)
      throw new Error("No se pudo obtener respuesta del servidor. Por favor, intenta de nuevo.")
    }
  }

  private async getApiResponse(userMessage: string): Promise<string> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
    })

    const requestBody: ChatRequest = { prompt: userMessage }

    // 🔍 Debug: Mostrar lo que se va a enviar
    console.log("📦 Request body:", requestBody)
    console.log("📋 Headers:", headers)

    return new Promise((resolve, reject) => {
      this.http
        .post<ChatResponse>(this.API_URL, requestBody, { headers })
        .pipe(
          timeout(this.REQUEST_TIMEOUT),
          catchError((error: HttpErrorResponse) => {
            console.error("🚨 Error en la petición HTTP:", error)
            console.error("🔗 URL que falló:", error.url)
            console.error("📊 Status:", error.status)
            console.error("📝 Mensaje:", error.message)
            reject(error)
            return of(null)
          }),
        )
        .subscribe({
          next: (response) => {
            if (response && response.content) {
              console.log("✅ Respuesta exitosa:", response)
              resolve(response.content)
            } else {
              console.error("❌ Respuesta inválida:", response)
              reject(new Error("Respuesta inválida de la API"))
            }
          },
          error: (error) => {
            console.error("❌ Error en subscribe:", error)
            reject(error)
          },
        })
    })
  }

  testApiConnection(): Observable<boolean> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "application/json",
    })

    const testBody: ChatRequest = { prompt: "test" }

    console.log("🔍 Probando conexión a:", this.API_URL)

    return this.http.post<ChatResponse>(this.API_URL, testBody, { headers }).pipe(
      timeout(5000),
      map((response) => {
        console.log("✅ Test de conexión exitoso:", response)
        return !!(response && response.content)
      }),
      catchError((error) => {
        console.error("❌ Test de conexión falló:", error)
        return of(false)
      }),
    )
  }

  clearConversation(): void {
    this.conversationId = null
    this.messages = []
  }
}
