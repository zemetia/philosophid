import { createHash } from 'crypto'

/**
 * Midtrans Payment Provider Integration
 */
export class PaymentProvider {
  private serverKey: string
  private isProduction: boolean

  constructor() {
    this.serverKey = process.env.MIDTRANS_SERVER_KEY || ''
    this.isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true'
  }

  generateSignature(orderId: string, statusCode: string, grossAmount: string): string {
    const payload = `${orderId}${statusCode}${grossAmount}${this.serverKey}`
    return createHash('sha512').update(payload).digest('hex')
  }

  verifySignature(notification: any): boolean {
    const { order_id, status_code, gross_amount, signature_key } = notification
    const validSignature = this.generateSignature(order_id, status_code, gross_amount)
    return signature_key === validSignature
  }

  async createSnapTransaction(params: {
    transactionDetails: {
      orderId: string
      grossAmount: number
    }
    customerDetails?: {
      firstName?: string
      lastName?: string
      email?: string
      phone?: string
    }
  }) {
    const basicAuth = Buffer.from(this.serverKey + ':').toString('base64')
    const url = this.isProduction 
      ? 'https://app.midtrans.com/snap/v1/transactions'
      : 'https://app.sandbox.midtrans.com/snap/v1/transactions'

    const payload = {
      transaction_details: {
        order_id: params.transactionDetails.orderId,
        gross_amount: params.transactionDetails.grossAmount,
      },
      customer_details: params.customerDetails ? {
        first_name: params.customerDetails.firstName,
        last_name: params.customerDetails.lastName,
        email: params.customerDetails.email,
        phone: params.customerDetails.phone,
      } : undefined
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${basicAuth}`
      },
      body: JSON.stringify(payload)
    })

    if (!res.ok) {
      const err = await res.text()
      throw new Error(`Midtrans Error: ${err}`)
    }

    return res.json()
  }
}

export const paymentProvider = new PaymentProvider();
