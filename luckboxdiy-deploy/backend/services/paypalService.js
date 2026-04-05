const axios = require('axios');

class PayPalService {
  constructor() {
    this.clientId = process.env.PAYPAL_CLIENT_ID;
    this.clientSecret = process.env.PAYPAL_SECRET;
    this.apiUrl = process.env.NODE_ENV === 'production' 
      ? 'https://api-m.paypal.com' 
      : 'https://api-m.sandbox.paypal.com';
    this.accessToken = null;
    this.tokenExpiresAt = null;
  }

  async getAccessToken() {
    if (this.accessToken && Date.now() < this.tokenExpiresAt) {
      return this.accessToken;
    }

    const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
    
    try {
      const response = await axios.post(
        `${this.apiUrl}/v1/oauth2/token`,
        'grant_type=client_credentials',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${auth}`
          }
        }
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiresAt = Date.now() + (response.data.expires_in * 1000) - 60000;
      
      return this.accessToken;
    } catch (error) {
      console.error('Error getting PayPal access token:', error.response?.data || error.message);
      throw error;
    }
  }

  async createOrder(amount, currency = 'USD', description = '') {
    const accessToken = await this.getAccessToken();

    try {
      const response = await axios.post(
        `${this.apiUrl}/v2/checkout/orders`,
        {
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: currency,
                value: amount.toFixed(2)
              },
              description: description
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error creating PayPal order:', error.response?.data || error.message);
      throw error;
    }
  }

  async captureOrder(orderId) {
    const accessToken = await this.getAccessToken();

    try {
      const response = await axios.post(
        `${this.apiUrl}/v2/checkout/orders/${orderId}/capture`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error capturing PayPal order:', error.response?.data || error.message);
      throw error;
    }
  }

  async getOrderDetails(orderId) {
    const accessToken = await this.getAccessToken();

    try {
      const response = await axios.get(
        `${this.apiUrl}/v2/checkout/orders/${orderId}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error getting PayPal order details:', error.response?.data || error.message);
      throw error;
    }
  }
}

module.exports = new PayPalService();
