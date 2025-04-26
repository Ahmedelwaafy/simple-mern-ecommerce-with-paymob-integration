import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/schemas/user.schema';
import { OrderStatus } from '../enums';
import { Order, OrderDocument } from '../schemas/order.schema';
import { OrderUtilsProvider } from './order-utils.provider';

//https://developers.paymob.com/egypt/api-reference-guide/api-setup-secret-and-public-key
//https://developers.paymob.com/egypt/api-reference-guide/api-setup-secret-and-public-key
//
@Injectable()
export class PaymobProvider {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private orderUtilsProvider: OrderUtilsProvider,
    private readonly configService: ConfigService,
  ) {}

  //***** Create Paymob payment intention******

  async createPaymobCheckoutSession(
    order: OrderDocument,
    user: UserDocument,
    redirection_url: string,
  ) {
    try {
      // Map cart items to Paymob items format
      const items = order.orderItems.map((item) => {
        return {
          name: item.product.name,
          amount: Math.round(
            (item.product.priceAfterDiscount || item.product.price) * 100,
          ),
          description: `Product ID: ${item.product._id}`,
          quantity: item.quantity,
        };
      });

      // Add shipping and taxes as separate items if needed
      if (order.shippingCost > 0) {
        items.push({
          name: 'Shipping',
          amount: Math.round(order.shippingCost * 100),
          description: 'Shipping costs',
          quantity: 1,
        });
      }

      if (order.tax > 0) {
        items.push({
          name: 'Tax',
          amount: Math.round(order.tax * 100),
          description: 'Tax',
          quantity: 1,
        });
      }

      // Prepare billing data from shipping address
      const shippingAddress =
        typeof order.shippingAddress === 'string'
          ? {
              fullName: '',
              addressLine1: order.shippingAddress,
              addressLine2: '',
              city: '',
              state: '',
              postalCode: '',
              country: '',
              phoneNumber: '',
            }
          : order.shippingAddress;

      const billingData = {
        apartment: shippingAddress.addressLine2,
        first_name: user.name?.split(' ')[0] || '',
        last_name: user.name?.split(' ').slice(1).join(' ') || 'last name',
        street: shippingAddress.addressLine1 || '',
        building: shippingAddress.addressLine1 || '',
        phone_number: user.phoneNumber || '01000000000',
        country: shippingAddress.country || 'EGP',
        email: user.email,
        floor: '',
        state: shippingAddress.state,
        city: shippingAddress.city,
        postal_code: shippingAddress.postalCode,
      };
      const cardIntegrationId = Number(
        this.configService.get('paymentGateway.paymob.cardIntegrationId'),
      );
      // Create intention request
      const intentionPayload = {
        amount: Math.round(order.finalTotal * 100), // Amount in cents
        currency: 'EGP',
        payment_methods: [cardIntegrationId],
        items,
        billing_data: billingData,
        customer: {
          first_name: user.name?.split(' ')[0] || '',
          last_name: user.name?.split(' ').slice(1).join(' ') || '',
          email: user.email,
        },
        extras: {
          orderId: order._id.toString(),
          userId: user._id.toString(),
        },
        special_reference: order._id.toString(), // Refer to a unique or special identifier or reference associated with a transaction or order. It can be used for tracking or categorizing specific types of transactions and it returns within the transaction callback under merchant_order_id
        notification_url:
          'https://webhook.site/4314d857-18b2-4171-b3dd-67d0b7e8fd43',
        redirection_url,
        //Notification and redirection URL are working only with Cards and they overlap the transaction processed and response callbacks sent per Integration ID
      };
console.log({ items });
      // Make API request to Paymob
      const session = await axios.post(
        `${this.configService.get('paymentGateway.paymob.baseUrl')}/intention/`,
        intentionPayload,
        {
          headers: {
            Authorization: `Token ${this.configService.get('paymentGateway.paymob.secretKey')}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!session.data || !session.data.client_secret) {
        throw new BadRequestException(
          'Failed to create Paymob checkout session',
        );
      }
      //console.log(session.data);
      // Extract the redirection URL from the session
      const redirectUrl = `https://accept.paymob.com/unifiedcheckout/?publicKey=${this.configService.get('paymentGateway.paymob.publicKey')}&clientSecret=${session.data.client_secret}`;

      // Update product inventory and clear cart
      //TODO: this should be done in the webhook response, but paymob doesn't provide a direct access for the webhook in development environment
      await this.orderUtilsProvider.updateProductsInventoryAndClearCart(order);
      return {
        sessionUrl: redirectUrl,
        sessionId: session.data.id,
        finalTotal: session.data.intention_detail.amount,
        gateway: 'paymob',
        status: 'pending',
      };
    } catch (error) {
      console.error(
        'Paymob checkout session creation failed:',
        error.response?.data || error.message,
      );
      throw new BadRequestException('Failed to create Paymob checkout session');
    }
  }

  //***** Handle Paymob webhook ******

  async handlePaymobWebhook(payload: any, hmacHeader: string): Promise<void> {}
}
