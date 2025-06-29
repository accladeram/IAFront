import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
interface CheckoutItem {
  id: string;
  type: 'ticket' | 'merchandise';
  eventName: string;
  description: string;
  quantity: number;
  price: number;
  currency: string;
}

interface PaymentMethod {
  type: 'visa' | 'mastercard' | 'paypal';
  lastFourDigits: string;
  expiryDate?: string;
}

@Component({
  selector: 'app-payment-component',
  imports: [CommonModule],
  templateUrl: './payment-component.html',
  styleUrl: './payment-component.css'
})
export class PaymentComponent implements OnInit {
  headerTitle = 'Eventos pasados';
  purchaseButtonText = 'Realizar compra';
  isProcessing = false;
  discountCode = '';

  paymentMethod: PaymentMethod = {
    type: 'visa',
    lastFourDigits: '1234',
    expiryDate: '12/26'
  };

  checkoutItems: CheckoutItem[] = [
    {
      id: 'item1',
      type: 'ticket',
      eventName: 'Bar Puerta al Sol',
      description: 'Descripción: Concierto Luis Vega',
      quantity: 1,
      price: 9.99,
      currency: 'USD'
    },
    {
      id: 'item2',
      type: 'ticket',
      eventName: 'Estadio Real Santa Cruz',
      description: 'Descripción: Concierto Luckra',
      quantity: 1,
      price: 4.99,
      currency: 'USD'
    }
  ];

  private taxRate = 0.067; // 6.7% tax rate
  private discountRate = 0; // No discount by default

  ngOnInit() {
    // Component initialization
  }

  getPaymentTypeDisplay(): string {
    switch (this.paymentMethod.type) {
      case 'visa': return 'Visa';
      case 'mastercard': return 'Mastercard';
      case 'paypal': return 'PayPal';
      default: return 'Card';
    }
  }

  getItemTypeDisplay(type: string): string {
    switch (type) {
      case 'ticket': return 'Entrada';
      case 'merchandise': return 'Mercancía';
      default: return 'Item';
    }
  }

  getTotalItems(): number {
    return this.checkoutItems.reduce((total, item) => total + item.quantity, 0);
  }

  getSubtotal(): number {
    return this.checkoutItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getDiscountAmount(): number {
    return this.getSubtotal() * this.discountRate;
  }

  getTaxes(): number {
    const subtotalAfterDiscount = this.getSubtotal() - this.getDiscountAmount();
    return subtotalAfterDiscount * this.taxRate;
  }

  getTotal(): number {
    const subtotal = this.getSubtotal();
    const discount = this.getDiscountAmount();
    const taxes = this.getTaxes();
    return subtotal - discount + taxes;
  }

  getShippingDisplay(): string {
    return 'Free';
  }

  trackByItemId(index: number, item: CheckoutItem): string {
    return item.id;
  }

  goBack() {
    console.log('Going back...');
    window.history.back();
  }

  changePaymentMethod() {
    console.log('Changing payment method...');
    // Implement payment method selection
  }

  applyDiscount() {
    console.log('Applying discount...');
    // Implement discount code application
    // For demo purposes, apply a 10% discount
    if (!this.discountCode) {
      this.discountCode = 'SAVE10';
      this.discountRate = 0.10;
    }
  }

  completePurchase() {
    if (this.isProcessing) return;

    this.isProcessing = true;
    console.log('Processing purchase...');

    // Simulate purchase processing
    setTimeout(() => {
      this.isProcessing = false;
      console.log('Purchase completed!');
      // Implement success navigation or modal
    }, 2000);
  }

}
