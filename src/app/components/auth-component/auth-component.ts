import { CommonModule } from "@angular/common"
import { Component, OnInit } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { LoginForm } from "../../modules/eventos/interfaces/auth"

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.html',
  styleUrl: './auth-component.css',
  imports: [CommonModule, FormsModule],
})
export class AuthComponent implements OnInit {
  currentView: "login" | "register" | "forgot-password" | "loading" | "success" = "login"
  isLoading = false
  showPassword = false
  errorMessage = ""

  loginForm: LoginForm = {
    email: "",
    password: "",
  }

  registerForm = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  }

  forgotPasswordEmail = ""

  constructor() { }

  ngOnInit(): void { }

  // Login con email y contraseña
  loginWithEmail() {
    if (this.validateLoginForm()) {
      this.isLoading = true
      this.errorMessage = ""

      // Simular autenticación
      setTimeout(() => {
        this.isLoading = false
        if (this.loginForm.email === "demo@example.com" && this.loginForm.password === "123456") {
          this.currentView = "success"
        } else {
          this.errorMessage = "Email o contraseña incorrectos"
        }
      }, 2000)
    }
  }

  // Login con Google
  loginWithGoogle() {
    this.isLoading = true
    this.errorMessage = ""

    // Simular autenticación con Google
    setTimeout(() => {
      this.isLoading = false
      this.currentView = "success"
    }, 1500)
  }

  // Registro de nueva cuenta
  registerAccount() {
    if (this.validateRegisterForm()) {
      this.isLoading = true
      this.errorMessage = ""

      setTimeout(() => {
        this.isLoading = false
        this.currentView = "success"
      }, 2000)
    }
  }

  // Recuperar contraseña
  sendPasswordReset() {
    if (this.forgotPasswordEmail && this.isValidEmail(this.forgotPasswordEmail)) {
      this.isLoading = true
      this.errorMessage = ""

      setTimeout(() => {
        this.isLoading = false
        this.errorMessage = ""
        alert("Se ha enviado un enlace de recuperación a tu email")
        this.currentView = "login"
      }, 1500)
    } else {
      this.errorMessage = "Por favor ingresa un email válido"
    }
  }

  // Validaciones
  validateLoginForm(): boolean {
    if (!this.loginForm.email || !this.loginForm.password) {
      this.errorMessage = "Por favor completa todos los campos"
      return false
    }

    if (!this.isValidEmail(this.loginForm.email)) {
      this.errorMessage = "Por favor ingresa un email válido"
      return false
    }

    if (this.loginForm.password.length < 6) {
      this.errorMessage = "La contraseña debe tener al menos 6 caracteres"
      return false
    }

    return true
  }

  validateRegisterForm(): boolean {
    if (
      !this.registerForm.firstName ||
      !this.registerForm.lastName ||
      !this.registerForm.email ||
      !this.registerForm.password ||
      !this.registerForm.confirmPassword
    ) {
      this.errorMessage = "Por favor completa todos los campos"
      return false
    }

    if (!this.isValidEmail(this.registerForm.email)) {
      this.errorMessage = "Por favor ingresa un email válido"
      return false
    }

    if (this.registerForm.password.length < 6) {
      this.errorMessage = "La contraseña debe tener al menos 6 caracteres"
      return false
    }

    if (this.registerForm.password !== this.registerForm.confirmPassword) {
      this.errorMessage = "Las contraseñas no coinciden"
      return false
    }

    return true
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Navegación entre vistas
  switchToRegister() {
    this.currentView = "register"
    this.clearForm()
  }

  switchToLogin() {
    this.currentView = "login"
    this.clearForm()
  }

  switchToForgotPassword() {
    this.currentView = "forgot-password"
    this.clearForm()
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword
  }

  clearForm() {
    this.loginForm = { email: "", password: "" }
    this.registerForm = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
    this.forgotPasswordEmail = ""
    this.errorMessage = ""
    this.isLoading = false
  }

  startOver() {
    this.currentView = "login"
    this.clearForm()
  }
}
