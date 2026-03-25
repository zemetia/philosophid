import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PaymentService } from '@/lib/payment'
import { TransactionStatus } from '@prisma/client'

const paymentService = new PaymentService()

export async function POST(req: NextRequest) {
  try {
    const notification = await req.json()
    
    // 1. Log the raw notification (Audit Trail)
    // We try to find the transaction first to link it, or log it as 'UNKNOWN' if not found
    const orderId = notification.order_id
    const transaction = await prisma.transaction.findUnique({
      where: { id: orderId },
      include: { competitionEntry: true }
    })

    if (!transaction) {
      console.error(`Transaction not found: ${orderId}`)
      return NextResponse.json({ message: 'Transaction not found' }, { status: 404 })
    }

    // 2. Insert into TransactionLog
    await prisma.transactionLog.create({
      data: {
        transactionId: transaction.id,
        status: notification.transaction_status,
        payload: notification as any // stored as Json
      }
    })

    // 3. Verify Signature
    const isValid = paymentService.verifySignature(notification)
    if (!isValid) {
      console.error("Invalid Signature", notification)
      return NextResponse.json({ message: 'Invalid Signature' }, { status: 403 })
    }

    // 4. Determine new status
    let newStatus: TransactionStatus = TransactionStatus.PENDING
    const status = notification.transaction_status
    const type = notification.payment_type
    const fraudStatus = notification.fraud_status

    if (status === 'capture') {
      if (fraudStatus === 'challenge') {
        newStatus = TransactionStatus.PENDING // or custom CHALLENGE status
      } else if (fraudStatus === 'accept') {
        newStatus = TransactionStatus.SUCCESS
      }
    } else if (status === 'settlement') {
      newStatus = TransactionStatus.SUCCESS
    } else if (status === 'cancel' || status === 'deny' || status === 'expire') {
      newStatus = TransactionStatus.FAILED
    } else if (status === 'pending') {
      newStatus = TransactionStatus.PENDING
    }

    // 5. Update Transaction
    await prisma.transaction.update({
      where: { id: orderId },
      data: {
        status: newStatus,
        paymentMethod: type,
        paymentGatewayRef: notification.transaction_id
      }
    })

    // 6. If Success, finalize Logic (e.g., mark competition entry as paid?)
    if (newStatus === TransactionStatus.SUCCESS && transaction.competitionEntry) {
      await prisma.paper.update({
        where: { id: transaction.competitionEntry.paperId },
        data: { status: "COMPETITION_ENTRY" }
      });
    }

    return NextResponse.json({ message: 'OK' })

  } catch (error) {
    console.error('Payment Notification Error:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
