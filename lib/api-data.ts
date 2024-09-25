// Library function enhanced for CodeBoiler functionality - Sept 2024
import type { APITemplate, Category } from '@/types/api'

// Mock API data - in production this would come from a database or API
export const apiTemplates: APITemplate[] = [
  // PAYMENT PROCESSING APIS
  {
    id: 'stripe',
    slug: 'stripe',
    name: 'Stripe',
    category: 'Payment Processing',
    description: 'Complete payment processing with subscriptions, webhooks, and marketplace functionality.',
    icon: '💳',
    features: [
      'Payment Intents API',
      'Subscription Management',
      'Webhook Handling',
      'Customer Portal',
      'Multi-party Payments',
      'Strong Customer Authentication'
    ],
    popularity: 98,
    documentation: 'https://stripe.com/docs',
    codeTemplates: {
      javascript: {
        vanilla: `// Stripe Payment Integration
const stripe = require('stripe')('sk_test_...');

class StripePayments {
  constructor(secretKey) {
    this.stripe = require('stripe')(secretKey);
  }

  async createPaymentIntent(amount, currency = 'usd', customerId = null) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amount * 100, // Convert to cents
        currency,
        customer: customerId,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      };
    } catch (error) {
      console.error('Stripe Payment Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async createCustomer(email, name) {
    try {
      const customer = await this.stripe.customers.create({
        email,
        name,
      });

      return {
        success: true,
        customerId: customer.id
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async handleWebhook(body, signature, webhookSecret) {
    try {
      const event = this.stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );

      switch (event.type) {
        case 'payment_intent.succeeded':
          console.log('Payment succeeded:', event.data.object);
          break;
        case 'payment_intent.payment_failed':
          console.log('Payment failed:', event.data.object);
          break;
        default:
          console.log(\`Unhandled event type \${event.type}\`);
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Usage
const payments = new StripePayments('sk_test_your_key');
payments.createPaymentIntent(29.99).then(console.log);`,
        react: `// Stripe React Integration with Elements
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_your_publishable_key');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      return;
    }

    // Create payment intent on your server
    const response = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 2999, // $29.99
        currency: 'usd',
      }),
    });

    const { client_secret } = await response.json();

    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Customer Name',
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      setSuccess(true);
    }

    setLoading(false);
  };

  if (success) {
    return <div className="success">Payment successful!</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="card-element-container">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          }}
        />
      </div>
      
      {error && <div className="error">{error}</div>}
      
      <button
        type="submit"
        disabled={!stripe || loading}
        className="pay-button"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export const StripeCheckout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};`
      },
      typescript: {
        vanilla: `// Stripe TypeScript Integration
import Stripe from 'stripe';

interface PaymentResult {
  success: boolean;
  clientSecret?: string;
  paymentIntentId?: string;
  error?: string;
}

interface CustomerResult {
  success: boolean;
  customerId?: string;
  error?: string;
}

class StripePayments {
  private stripe: Stripe;

  constructor(secretKey: string) {
    this.stripe = new Stripe(secretKey, {
      apiVersion: '2023-10-16',
    });
  }

  async createPaymentIntent(
    amount: number,
    currency: string = 'usd',
    customerId?: string
  ): Promise<PaymentResult> {
    try {
      const params: Stripe.PaymentIntentCreateParams = {
        amount: Math.round(amount * 100), // Convert to cents
        currency,
        automatic_payment_methods: {
          enabled: true,
        },
      };

      if (customerId) {
        params.customer = customerId;
      }

      const paymentIntent = await this.stripe.paymentIntents.create(params);

      return {
        success: true,
        clientSecret: paymentIntent.client_secret!,
        paymentIntentId: paymentIntent.id
      };
    } catch (error) {
      console.error('Stripe Payment Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async createCustomer(email: string, name: string): Promise<CustomerResult> {
    try {
      const customer = await this.stripe.customers.create({
        email,
        name,
      });

      return {
        success: true,
        customerId: customer.id
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async createSubscription(
    customerId: string,
    priceId: string
  ): Promise<{ success: boolean; subscriptionId?: string; error?: string }> {
    try {
      const subscription = await this.stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      });

      return {
        success: true,
        subscriptionId: subscription.id
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async handleWebhook(
    body: string,
    signature: string,
    webhookSecret: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const event = this.stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );

      switch (event.type) {
        case 'payment_intent.succeeded':
          console.log('Payment succeeded:', event.data.object);
          break;
        case 'payment_intent.payment_failed':
          console.log('Payment failed:', event.data.object);
          break;
        case 'customer.subscription.created':
          console.log('Subscription created:', event.data.object);
          break;
        case 'invoice.payment_succeeded':
          console.log('Invoice paid:', event.data.object);
          break;
        default:
          console.log(\`Unhandled event type \${event.type}\`);
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Invalid signature'
      };
    }
  }
}

// Usage
const payments = new StripePayments('sk_test_your_key');

async function processPayment() {
  const result = await payments.createPaymentIntent(29.99, 'usd');
  
  if (result.success) {
    console.log('Payment Intent created:', result.paymentIntentId);
  } else {
    console.error('Payment failed:', result.error);
  }
}

processPayment();`
      },
      python: {
        vanilla: `"""
Stripe Python Integration
Complete payment processing with subscriptions and webhooks
"""

import stripe
from typing import Dict, Any, Optional

class StripePayments:
    def __init__(self, secret_key: str):
        stripe.api_key = secret_key
        self.stripe = stripe
    
    def create_payment_intent(
        self, 
        amount: float, 
        currency: str = "usd", 
        customer_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """Create a payment intent for the specified amount"""
        try:
            params = {
                "amount": int(amount * 100),  # Convert to cents
                "currency": currency,
                "automatic_payment_methods": {"enabled": True}
            }
            
            if customer_id:
                params["customer"] = customer_id
            
            payment_intent = self.stripe.PaymentIntent.create(**params)
            
            return {
                "success": True,
                "client_secret": payment_intent.client_secret,
                "payment_intent_id": payment_intent.id
            }
        except stripe.error.StripeError as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def create_customer(self, email: str, name: str) -> Dict[str, Any]:
        """Create a new Stripe customer"""
        try:
            customer = self.stripe.Customer.create(
                email=email,
                name=name
            )
            
            return {
                "success": True,
                "customer_id": customer.id
            }
        except stripe.error.StripeError as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def create_subscription(
        self, 
        customer_id: str, 
        price_id: str
    ) -> Dict[str, Any]:
        """Create a subscription for a customer"""
        try:
            subscription = self.stripe.Subscription.create(
                customer=customer_id,
                items=[{"price": price_id}],
                payment_behavior="default_incomplete",
                payment_settings={"save_default_payment_method": "on_subscription"},
                expand=["latest_invoice.payment_intent"]
            )
            
            return {
                "success": True,
                "subscription_id": subscription.id,
                "client_secret": subscription.latest_invoice.payment_intent.client_secret
            }
        except stripe.error.StripeError as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def handle_webhook(
        self, 
        payload: bytes, 
        sig_header: str, 
        webhook_secret: str
    ) -> Dict[str, Any]:
        """Handle Stripe webhook events"""
        try:
            event = self.stripe.Webhook.construct_event(
                payload, sig_header, webhook_secret
            )
            
            if event["type"] == "payment_intent.succeeded":
                payment_intent = event["data"]["object"]
                print(f"Payment succeeded: {payment_intent['id']}")
                
            elif event["type"] == "payment_intent.payment_failed":
                payment_intent = event["data"]["object"]
                print(f"Payment failed: {payment_intent['id']}")
                
            elif event["type"] == "customer.subscription.created":
                subscription = event["data"]["object"]
                print(f"Subscription created: {subscription['id']}")
                
            elif event["type"] == "invoice.payment_succeeded":
                invoice = event["data"]["object"]
                print(f"Invoice paid: {invoice['id']}")
            
            return {"success": True}
            
        except ValueError:
            return {"success": False, "error": "Invalid payload"}
        except stripe.error.SignatureVerificationError:
            return {"success": False, "error": "Invalid signature"}

# Usage example
if __name__ == "__main__":
    payments = StripePayments("sk_test_your_key")
    
    # Create a payment intent
    result = payments.create_payment_intent(29.99, "usd")
    
    if result["success"]:
        print(f"Payment Intent created: {result['payment_intent_id']}")
    else:
        print(f"Error: {result['error']}")`,
        django: `"""
Stripe Django Integration
"""

from django.conf import settings
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import stripe
import json

stripe.api_key = getattr(settings, 'STRIPE_SECRET_KEY', '')

class StripeService:
    @staticmethod
    def create_payment_intent(amount, currency='usd', customer_id=None):
        try:
            params = {
                'amount': int(amount * 100),
                'currency': currency,
                'automatic_payment_methods': {'enabled': True}
            }
            
            if customer_id:
                params['customer'] = customer_id
                
            payment_intent = stripe.PaymentIntent.create(**params)
            
            return {
                'success': True,
                'client_secret': payment_intent.client_secret,
                'payment_intent_id': payment_intent.id
            }
        except stripe.error.StripeError as e:
            return {
                'success': False,
                'error': str(e)
            }

    @staticmethod
    def create_customer(email, name):
        try:
            customer = stripe.Customer.create(
                email=email,
                name=name
            )
            return {
                'success': True,
                'customer_id': customer.id
            }
        except stripe.error.StripeError as e:
            return {
                'success': False,
                'error': str(e)
            }

@require_http_methods(["POST"])
def create_payment_intent(request):
    try:
        data = json.loads(request.body)
        amount = data.get('amount')
        currency = data.get('currency', 'usd')
        
        result = StripeService.create_payment_intent(amount, currency)
        return JsonResponse(result)
        
    except json.JSONDecodeError:
        return JsonResponse({'success': False, 'error': 'Invalid JSON'}, status=400)

@csrf_exempt
@require_http_methods(["POST"])
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    endpoint_secret = getattr(settings, 'STRIPE_WEBHOOK_SECRET', '')
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except (ValueError, stripe.error.SignatureVerificationError):
        return HttpResponse(status=400)
    
    if event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']
        # Handle successful payment
        print(f"Payment succeeded: {payment_intent['id']}")
    
    return HttpResponse(status=200)

# Add to settings.py:
# STRIPE_SECRET_KEY = 'sk_test_your_secret_key'
# STRIPE_PUBLISHABLE_KEY = 'pk_test_your_publishable_key'
# STRIPE_WEBHOOK_SECRET = 'whsec_your_webhook_secret'`
      },
      php: {
        vanilla: `<?php
/**
 * Stripe PHP Integration
 * Complete payment processing with subscriptions and webhooks
 */

require_once 'vendor/autoload.php';

use Stripe\Stripe;
use Stripe\PaymentIntent;
use Stripe\Customer;
use Stripe\Subscription;
use Stripe\Webhook;

class StripePayments {
    private $secretKey;
    
    public function __construct($secretKey) {
        $this->secretKey = $secretKey;
        Stripe::setApiKey($secretKey);
    }
    
    public function createPaymentIntent($amount, $currency = 'usd', $customerId = null) {
        try {
            $params = [
                'amount' => $amount * 100, // Convert to cents
                'currency' => $currency,
                'automatic_payment_methods' => ['enabled' => true]
            ];
            
            if ($customerId) {
                $params['customer'] = $customerId;
            }
            
            $paymentIntent = PaymentIntent::create($params);
            
            return [
                'success' => true,
                'client_secret' => $paymentIntent->client_secret,
                'payment_intent_id' => $paymentIntent->id
            ];
            
        } catch (\Stripe\Exception\ApiErrorException $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
    
    public function createCustomer($email, $name) {
        try {
            $customer = Customer::create([
                'email' => $email,
                'name' => $name
            ]);
            
            return [
                'success' => true,
                'customer_id' => $customer->id
            ];
            
        } catch (\Stripe\Exception\ApiErrorException $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
    
    public function createSubscription($customerId, $priceId) {
        try {
            $subscription = Subscription::create([
                'customer' => $customerId,
                'items' => [['price' => $priceId]],
                'payment_behavior' => 'default_incomplete',
                'payment_settings' => ['save_default_payment_method' => 'on_subscription'],
                'expand' => ['latest_invoice.payment_intent']
            ]);
            
            return [
                'success' => true,
                'subscription_id' => $subscription->id,
                'client_secret' => $subscription->latest_invoice->payment_intent->client_secret
            ];
            
        } catch (\Stripe\Exception\ApiErrorException $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
    
    public function handleWebhook($payload, $sigHeader, $webhookSecret) {
        try {
            $event = Webhook::constructEvent($payload, $sigHeader, $webhookSecret);
            
            switch ($event->type) {
                case 'payment_intent.succeeded':
                    $paymentIntent = $event->data->object;
                    error_log("Payment succeeded: " . $paymentIntent->id);
                    break;
                    
                case 'payment_intent.payment_failed':
                    $paymentIntent = $event->data->object;
                    error_log("Payment failed: " . $paymentIntent->id);
                    break;
                    
                case 'customer.subscription.created':
                    $subscription = $event->data->object;
                    error_log("Subscription created: " . $subscription->id);
                    break;
                    
                case 'invoice.payment_succeeded':
                    $invoice = $event->data->object;
                    error_log("Invoice paid: " . $invoice->id);
                    break;
                    
                default:
                    error_log("Unhandled event type: " . $event->type);
            }
            
            return ['success' => true];
            
        } catch (\UnexpectedValueException $e) {
            return ['success' => false, 'error' => 'Invalid payload'];
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            return ['success' => false, 'error' => 'Invalid signature'];
        }
    }
}

// Usage example
try {
    $stripe = new StripePayments('sk_test_your_key');
    $result = $stripe->createPaymentIntent(29.99, 'usd');
    
    if ($result['success']) {
        echo json_encode($result, JSON_PRETTY_PRINT);
    } else {
        echo "Error: " . $result['error'];
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}

// For webhook handling (webhook.php)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $payload = file_get_contents('php://input');
    $sigHeader = $_SERVER['HTTP_STRIPE_SIGNATURE'] ?? '';
    $webhookSecret = 'whsec_your_webhook_secret';
    
    $stripe = new StripePayments('sk_test_your_key');
    $result = $stripe->handleWebhook($payload, $sigHeader, $webhookSecret);
    
    http_response_code($result['success'] ? 200 : 400);
    echo json_encode($result);
}
?>`
      },
      go: {
        vanilla: `package main

import (
    "encoding/json"
    "fmt"
    "io"
    "log"
    "net/http"
    "os"

    "github.com/stripe/stripe-go/v74"
    "github.com/stripe/stripe-go/v74/customer"
    "github.com/stripe/stripe-go/v74/paymentintent"
    "github.com/stripe/stripe-go/v74/sub"
    "github.com/stripe/stripe-go/v74/webhook"
)

type StripePayments struct {
    SecretKey string
}

type PaymentResult struct {
    Success         bool   \`json:"success"\`
    ClientSecret    string \`json:"client_secret,omitempty"\`
    PaymentIntentID string \`json:"payment_intent_id,omitempty"\`
    Error           string \`json:"error,omitempty"\`
}

type CustomerResult struct {
    Success    bool   \`json:"success"\`
    CustomerID string \`json:"customer_id,omitempty"\`
    Error      string \`json:"error,omitempty"\`
}

func NewStripePayments(secretKey string) *StripePayments {
    stripe.Key = secretKey
    return &StripePayments{
        SecretKey: secretKey,
    }
}

func (s *StripePayments) CreatePaymentIntent(amount int64, currency string, customerID *string) PaymentResult {
    params := &stripe.PaymentIntentParams{
        Amount:   stripe.Int64(amount * 100), // Convert to cents
        Currency: stripe.String(currency),
        AutomaticPaymentMethods: &stripe.PaymentIntentAutomaticPaymentMethodsParams{
            Enabled: stripe.Bool(true),
        },
    }

    if customerID != nil {
        params.Customer = customerID
    }

    pi, err := paymentintent.New(params)
    if err != nil {
        return PaymentResult{
            Success: false,
            Error:   err.Error(),
        }
    }

    return PaymentResult{
        Success:         true,
        ClientSecret:    pi.ClientSecret,
        PaymentIntentID: pi.ID,
    }
}

func (s *StripePayments) CreateCustomer(email, name string) CustomerResult {
    params := &stripe.CustomerParams{
        Email: stripe.String(email),
        Name:  stripe.String(name),
    }

    c, err := customer.New(params)
    if err != nil {
        return CustomerResult{
            Success: false,
            Error:   err.Error(),
        }
    }

    return CustomerResult{
        Success:    true,
        CustomerID: c.ID,
    }
}

func (s *StripePayments) CreateSubscription(customerID, priceID string) (map[string]interface{}, error) {
    params := &stripe.SubscriptionParams{
        Customer: stripe.String(customerID),
        Items: []*stripe.SubscriptionItemsParams{
            {
                Price: stripe.String(priceID),
            },
        },
        PaymentBehavior: stripe.String("default_incomplete"),
        PaymentSettings: &stripe.SubscriptionPaymentSettingsParams{
            SaveDefaultPaymentMethod: stripe.String("on_subscription"),
        },
    }
    params.AddExpand("latest_invoice.payment_intent")

    sub, err := sub.New(params)
    if err != nil {
        return map[string]interface{}{
            "success": false,
            "error":   err.Error(),
        }, err
    }

    return map[string]interface{}{
        "success":         true,
        "subscription_id": sub.ID,
        "client_secret":   sub.LatestInvoice.PaymentIntent.ClientSecret,
    }, nil
}

func (s *StripePayments) HandleWebhook(body []byte, signature, webhookSecret string) (map[string]interface{}, error) {
    event, err := webhook.ConstructEvent(body, signature, webhookSecret)
    if err != nil {
        return map[string]interface{}{
            "success": false,
            "error":   "Invalid signature",
        }, err
    }

    switch event.Type {
    case "payment_intent.succeeded":
        var paymentIntent stripe.PaymentIntent
        if err := json.Unmarshal(event.Data.Raw, &paymentIntent); err != nil {
            log.Printf("Error parsing webhook JSON: %v", err)
        } else {
            log.Printf("Payment succeeded: %s", paymentIntent.ID)
        }

    case "payment_intent.payment_failed":
        var paymentIntent stripe.PaymentIntent
        if err := json.Unmarshal(event.Data.Raw, &paymentIntent); err != nil {
            log.Printf("Error parsing webhook JSON: %v", err)
        } else {
            log.Printf("Payment failed: %s", paymentIntent.ID)
        }

    case "customer.subscription.created":
        var subscription stripe.Subscription
        if err := json.Unmarshal(event.Data.Raw, &subscription); err != nil {
            log.Printf("Error parsing webhook JSON: %v", err)
        } else {
            log.Printf("Subscription created: %s", subscription.ID)
        }

    default:
        log.Printf("Unhandled event type: %s", event.Type)
    }

    return map[string]interface{}{"success": true}, nil
}

// HTTP handlers
func createPaymentIntentHandler(w http.ResponseWriter, r *http.Request) {
    stripe := NewStripePayments("sk_test_your_key")

    var req struct {
        Amount   int64  \`json:"amount"\`
        Currency string \`json:"currency"\`
    }

    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    result := stripe.CreatePaymentIntent(req.Amount, req.Currency, nil)
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(result)
}

func webhookHandler(w http.ResponseWriter, r *http.Request) {
    stripe := NewStripePayments("sk_test_your_key")
    
    body, err := io.ReadAll(r.Body)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    signature := r.Header.Get("Stripe-Signature")
    webhookSecret := "whsec_your_webhook_secret"

    result, err := stripe.HandleWebhook(body, signature, webhookSecret)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(result)
}

func main() {
    // Example usage
    stripe := NewStripePayments("sk_test_your_key")
    
    result := stripe.CreatePaymentIntent(2999, "usd", nil) // $29.99
    if result.Success {
        fmt.Printf("Payment Intent created: %s\\n", result.PaymentIntentID)
    } else {
        fmt.Printf("Error: %s\\n", result.Error)
    }

    // HTTP server setup
    http.HandleFunc("/create-payment-intent", createPaymentIntentHandler)
    http.HandleFunc("/webhook", webhookHandler)
    
    fmt.Println("Server starting on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

// Add to go.mod:
// module stripe-integration
// go 1.19
// require github.com/stripe/stripe-go/v74 v74.30.0`
      },
      rust: {
        vanilla: `use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Serialize, Deserialize)]
pub struct PaymentIntentRequest {
    pub amount: i64,
    pub currency: String,
    pub customer_id: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PaymentIntentResponse {
    pub success: bool,
    pub client_secret: Option<String>,
    pub payment_intent_id: Option<String>,
    pub error: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CustomerRequest {
    pub email: String,
    pub name: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CustomerResponse {
    pub success: bool,
    pub customer_id: Option<String>,
    pub error: Option<String>,
}

pub struct StripePayments {
    secret_key: String,
    client: reqwest::Client,
}

impl StripePayments {
    pub fn new(secret_key: String) -> Self {
        Self {
            secret_key,
            client: reqwest::Client::new(),
        }
    }

    pub async fn create_payment_intent(
        &self,
        amount: i64,
        currency: &str,
        customer_id: Option<&str>,
    ) -> Result<PaymentIntentResponse, Box<dyn std::error::Error>> {
        let mut params = HashMap::new();
        params.insert("amount", (amount * 100).to_string()); // Convert to cents
        params.insert("currency", currency.to_string());
        params.insert("automatic_payment_methods[enabled]", "true".to_string());

        if let Some(id) = customer_id {
            params.insert("customer", id.to_string());
        }

        let response = self
            .client
            .post("https://api.stripe.com/v1/payment_intents")
            .header("Authorization", format!("Bearer {}", self.secret_key))
            .form(&params)
            .send()
            .await?;

        if response.status().is_success() {
            let json: serde_json::Value = response.json().await?;
            Ok(PaymentIntentResponse {
                success: true,
                client_secret: json["client_secret"].as_str().map(String::from),
                payment_intent_id: json["id"].as_str().map(String::from),
                error: None,
            })
        } else {
            let error_text = response.text().await?;
            Ok(PaymentIntentResponse {
                success: false,
                client_secret: None,
                payment_intent_id: None,
                error: Some(error_text),
            })
        }
    }

    pub async fn create_customer(
        &self,
        email: &str,
        name: &str,
    ) -> Result<CustomerResponse, Box<dyn std::error::Error>> {
        let mut params = HashMap::new();
        params.insert("email", email);
        params.insert("name", name);

        let response = self
            .client
            .post("https://api.stripe.com/v1/customers")
            .header("Authorization", format!("Bearer {}", self.secret_key))
            .form(&params)
            .send()
            .await?;

        if response.status().is_success() {
            let json: serde_json::Value = response.json().await?;
            Ok(CustomerResponse {
                success: true,
                customer_id: json["id"].as_str().map(String::from),
                error: None,
            })
        } else {
            let error_text = response.text().await?;
            Ok(CustomerResponse {
                success: false,
                customer_id: None,
                error: Some(error_text),
            })
        }
    }

    pub async fn create_subscription(
        &self,
        customer_id: &str,
        price_id: &str,
    ) -> Result<serde_json::Value, Box<dyn std::error::Error>> {
        let mut params = HashMap::new();
        params.insert("customer", customer_id);
        params.insert("items[0][price]", price_id);
        params.insert("payment_behavior", "default_incomplete");
        params.insert("payment_settings[save_default_payment_method]", "on_subscription");
        params.insert("expand[]", "latest_invoice.payment_intent");

        let response = self
            .client
            .post("https://api.stripe.com/v1/subscriptions")
            .header("Authorization", format!("Bearer {}", self.secret_key))
            .form(&params)
            .send()
            .await?;

        let json: serde_json::Value = response.json().await?;
        Ok(json)
    }

    pub fn verify_webhook_signature(
        &self,
        payload: &str,
        signature: &str,
        webhook_secret: &str,
    ) -> Result<serde_json::Value, Box<dyn std::error::Error>> {
        // Note: In production, use the official Stripe crate for webhook verification
        // This is a simplified example
        let event: serde_json::Value = serde_json::from_str(payload)?;
        
        match event["type"].as_str() {
            Some("payment_intent.succeeded") => {
                println!("Payment succeeded: {:?}", event["data"]["object"]["id"]);
            }
            Some("payment_intent.payment_failed") => {
                println!("Payment failed: {:?}", event["data"]["object"]["id"]);
            }
            Some("customer.subscription.created") => {
                println!("Subscription created: {:?}", event["data"]["object"]["id"]);
            }
            Some("invoice.payment_succeeded") => {
                println!("Invoice paid: {:?}", event["data"]["object"]["id"]);
            }
            _ => {
                println!("Unhandled event type: {:?}", event["type"]);
            }
        }

        Ok(event)
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let stripe = StripePayments::new("sk_test_your_key".to_string());

    // Create a payment intent
    let result = stripe
        .create_payment_intent(2999, "usd", None) // $29.99
        .await?;

    if result.success {
        println!("Payment Intent created: {:?}", result.payment_intent_id);
        println!("Client Secret: {:?}", result.client_secret);
    } else {
        println!("Error: {:?}", result.error);
    }

    // Create a customer
    let customer_result = stripe
        .create_customer("customer@example.com", "John Doe")
        .await?;

    if customer_result.success {
        println!("Customer created: {:?}", customer_result.customer_id);
    } else {
        println!("Customer creation error: {:?}", customer_result.error);
    }

    Ok(())
}

// Add to Cargo.toml:
// [dependencies]
// reqwest = { version = "0.11", features = ["json"] }
// serde = { version = "1.0", features = ["derive"] }
// serde_json = "1.0"
// tokio = { version = "1", features = ["full"] }`
      }
    }
  },

  // PayPal API
  {
    id: 'paypal',
    slug: 'paypal',
    name: 'PayPal',
    category: 'Payment Processing',
    description: 'Integrate PayPal payments, subscriptions, and marketplace functionality with comprehensive APIs.',
    icon: '🅿️',
    features: [
      'PayPal Checkout',
      'Express Checkout',
      'Subscription Billing',
      'Marketplace Payments',
      'Dispute Management',
      'Transaction Search'
    ],
    popularity: 92,
    documentation: 'https://developer.paypal.com/docs/',
    codeTemplates: {
      javascript: {
        vanilla: `// PayPal Payment Integration
const paypal = require('@paypal/checkout-server-sdk');

class PayPalPayments {
  constructor(clientId, clientSecret, environment = 'sandbox') {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    
    // Set up PayPal environment
    const Environment = environment === 'sandbox' 
      ? paypal.core.SandboxEnvironment 
      : paypal.core.LiveEnvironment;
    
    this.paypalClient = new paypal.core.PayPalHttpClient(
      new Environment(clientId, clientSecret)
    );
  }

  async createOrder(amount, currency = 'USD') {
    try {
      const request = new paypal.orders.OrdersCreateRequest();
      request.prefer('return=representation');
      request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: currency,
            value: amount.toFixed(2)
          }
        }]
      });

      const order = await this.paypalClient.execute(request);
      
      return {
        success: true,
        orderId: order.result.id,
        approvalUrl: order.result.links.find(link => link.rel === 'approve').href
      };
    } catch (error) {
      console.error('PayPal Order Creation Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async captureOrder(orderId) {
    try {
      const request = new paypal.orders.OrdersCaptureRequest(orderId);
      request.requestBody({});

      const capture = await this.paypalClient.execute(request);
      
      return {
        success: true,
        captureId: capture.result.purchase_units[0].payments.captures[0].id,
        status: capture.result.status
      };
    } catch (error) {
      console.error('PayPal Capture Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async createSubscription(planId) {
    try {
      const request = new paypal.subscriptions.SubscriptionsCreateRequest();
      request.requestBody({
        plan_id: planId,
        start_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Start tomorrow
        subscriber: {
          name: {
            given_name: 'John',
            surname: 'Doe'
          },
          email_address: 'customer@example.com'
        }
      });

      const subscription = await this.paypalClient.execute(request);
      
      return {
        success: true,
        subscriptionId: subscription.result.id,
        approvalUrl: subscription.result.links.find(link => link.rel === 'approve').href
      };
    } catch (error) {
      console.error('PayPal Subscription Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async verifyWebhook(headers, body, webhookId) {
    try {
      const request = new paypal.notifications.VerifyWebhookSignatureRequest();
      request.requestBody({
        transmission_id: headers['paypal-transmission-id'],
        cert_id: headers['paypal-cert-id'],
        auth_algo: headers['paypal-auth-algo'],
        transmission_sig: headers['paypal-transmission-sig'],
        transmission_time: headers['paypal-transmission-time'],
        webhook_id: webhookId,
        webhook_event: JSON.parse(body)
      });

      const response = await this.paypalClient.execute(request);
      
      return {
        success: true,
        verified: response.result.verification_status === 'SUCCESS'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Usage example
const payments = new PayPalPayments(
  'your_client_id',
  'your_client_secret',
  'sandbox'
);

payments.createOrder(29.99, 'USD').then(console.log);`,
        react: `// PayPal React Integration
import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalCheckout = ({ amount = 29.99, currency = 'USD', onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: amount.toFixed(2),
          currency_code: currency
        },
        description: 'Your Product Description'
      }]
    });
  };

  const onApprove = async (data, actions) => {
    setLoading(true);
    try {
      const order = await actions.order.capture();
      console.log('Order captured:', order);
      
      if (onSuccess) {
        onSuccess(order);
      }
    } catch (error) {
      console.error('PayPal capture error:', error);
      setError('Payment capture failed');
      if (onError) {
        onError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const onErrorHandler = (error) => {
    console.error('PayPal error:', error);
    setError('Payment failed');
    if (onError) {
      onError(error);
    }
  };

  const onCancel = (data) => {
    console.log('Payment cancelled:', data);
    setError('Payment was cancelled');
  };

  if (error) {
    return (
      <div className="error">
        <p>Payment Error: {error}</p>
        <button onClick={() => setError(null)}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="paypal-checkout">
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onErrorHandler}
        onCancel={onCancel}
        disabled={loading}
        style={{
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'paypal'
        }}
      />
      {loading && <div className="loading">Processing payment...</div>}
    </div>
  );
};

const PayPalProvider = ({ children }) => {
  const initialOptions = {
    'client-id': 'your_paypal_client_id',
    currency: 'USD',
    intent: 'capture',
    'enable-funding': 'venmo,paylater',
    'disable-funding': 'card'
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      {children}
    </PayPalScriptProvider>
  );
};

// Usage Example
export const PayPalExample = () => {
  const handleSuccess = (order) => {
    console.log('Payment successful:', order);
    // Handle successful payment
  };

  const handleError = (error) => {
    console.error('Payment error:', error);
    // Handle payment error
  };

  return (
    <PayPalProvider>
      <div className="checkout-container">
        <h2>Complete Your Purchase</h2>
        <div className="amount">Total: $29.99</div>
        <PayPalCheckout
          amount={29.99}
          currency="USD"
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </div>
    </PayPalProvider>
  );
};`
      }
    }
  },

  // AUTHENTICATION APIS
  {
    id: 'auth0',
    slug: 'auth0',
    name: 'Auth0',
    category: 'Authentication',
    description: 'Universal authentication and authorization platform with social logins, SSO, and MFA.',
    icon: '🔐',
    features: [
      'Universal Login',
      'Social Connections',
      'Multi-factor Authentication',
      'Single Sign-On (SSO)',
      'User Management',
      'Rules & Hooks'
    ],
    popularity: 95,
    documentation: 'https://auth0.com/docs',
    codeTemplates: {
      javascript: {
        vanilla: `// Auth0 JavaScript Integration
import { Auth0Client } from '@auth0/auth0-js';

class Auth0Service {
  constructor(domain, clientId) {
    this.auth0 = new Auth0Client({
      domain: domain,
      clientId: clientId,
      redirectUri: window.location.origin,
      responseType: 'token id_token',
      scope: 'openid profile email'
    });
    
    this.handleAuthentication();
  }

  // Login with redirect
  login() {
    this.auth0.authorize();
  }

  // Login with popup
  async loginWithPopup() {
    try {
      await this.auth0.popup.authorize({
        responseType: 'token id_token'
      });
      
      return this.getProfile();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Handle authentication callback
  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        console.error('Authentication error:', err);
      }
    });
  }

  // Set session
  setSession(authResult) {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    
    // Trigger authentication state change
    window.dispatchEvent(new CustomEvent('authStateChanged', {
      detail: { authenticated: true }
    }));
  }

  // Logout
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    
    this.auth0.logout({
      returnTo: window.location.origin
    });
  }

  // Check if user is authenticated
  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '0');
    return new Date().getTime() < expiresAt;
  }

  // Get user profile
  getProfile() {
    return new Promise((resolve, reject) => {
      const accessToken = localStorage.getItem('access_token');
      
      if (!accessToken) {
        reject(new Error('No access token found'));
        return;
      }
      
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (profile) {
          resolve(profile);
        } else {
          reject(err);
        }
      });
    });
  }

  // Renew session
  renewSession() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve(authResult);
        } else {
          reject(err);
        }
      });
    });
  }

  // Get access token
  getAccessToken() {
    return localStorage.getItem('access_token');
  }
}

// Usage
const auth = new Auth0Service(
  'your-domain.auth0.com',
  'your-client-id'
);

// Login button handler
document.getElementById('loginBtn').addEventListener('click', () => {
  auth.login();
});

// Logout button handler
document.getElementById('logoutBtn').addEventListener('click', () => {
  auth.logout();
});

// Check authentication state
if (auth.isAuthenticated()) {
  auth.getProfile().then(profile => {
    console.log('User profile:', profile);
  });
}`,
        react: `// Auth0 React Integration
import React, { useState, useEffect, useContext, createContext } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

// Auth0 Provider Component
export const Auth0ProviderWithHistory = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const redirectUri = window.location.origin;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
      audience={\`https://\${domain}/api/v2/\`}
      scope="read:current_user update:current_user_metadata"
    >
      {children}
    </Auth0Provider>
  );
};

// Login Button Component
const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return null;
  }

  return (
    <button
      onClick={() => loginWithRedirect()}
      className="btn btn-primary"
    >
      Log In
    </button>
  );
};

// Logout Button Component
const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <button
      onClick={() => logout({
        returnTo: window.location.origin
      })}
      className="btn btn-secondary"
    >
      Log Out
    </button>
  );
};

// Profile Component
const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = process.env.REACT_APP_AUTH0_DOMAIN;

      try {
        const accessToken = await getAccessTokenSilently({
          audience: \`https://\${domain}/api/v2/\`,
          scope: "read:current_user",
        });

        const userDetailsByIdUrl = \`https://\${domain}/api/v2/users/\${user.sub}\`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: \`Bearer \${accessToken}\`,
          },
        });

        const { user_metadata } = await metadataResponse.json();
        setUserMetadata(user_metadata);
      } catch (e) {
        console.error('Error fetching user metadata:', e.message);
      }
    };

    if (isAuthenticated && user?.sub) {
      getUserMetadata();
    }
  }, [getAccessTokenSilently, user?.sub, isAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <img
          src={user.picture}
          alt={user.name}
          className="profile-avatar"
        />
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      </div>
      
      <div className="profile-details">
        <h3>Profile Information</h3>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        
        {userMetadata && (
          <>
            <h3>User Metadata</h3>
            <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
          </>
        )}
      </div>
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="unauthorized">
        <h2>Access Denied</h2>
        <p>Please log in to access this page.</p>
        <LoginButton />
      </div>
    );
  }

  return children;
};

// API Hook for authenticated requests
const useApi = () => {
  const { getAccessTokenSilently } = useAuth0();

  const makeAuthenticatedRequest = async (url, options = {}) => {
    try {
      const token = await getAccessTokenSilently();
      
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: \`Bearer \${token}\`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  };

  return { makeAuthenticatedRequest };
};

// Main App Component
const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Auth0 React Example</h1>
        <div className="auth-buttons">
          <LoginButton />
          <LogoutButton />
        </div>
      </header>

      <main>
        {isAuthenticated ? (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ) : (
          <div className="welcome">
            <h2>Welcome!</h2>
            <p>Please log in to continue.</p>
          </div>
        )}
      </main>
    </div>
  );
};

// Root component with Auth0 Provider
export default function AppWithAuth0() {
  return (
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
  );
}

// Environment variables needed (.env):
// REACT_APP_AUTH0_DOMAIN=your-domain.auth0.com
// REACT_APP_AUTH0_CLIENT_ID=your-client-id`
      }
    }
  },

  // Google OAuth API
  {
    id: 'google-oauth',
    slug: 'google-oauth',
    name: 'Google OAuth',
    category: 'Authentication',
    description: 'Secure authentication with Google accounts using OAuth 2.0 protocol.',
    icon: '🔍',
    features: [
      'OAuth 2.0 Flow',
      'Google Sign-In',
      'Profile Information',
      'Refresh Tokens',
      'Scope Management',
      'Server-side Auth'
    ],
    popularity: 88,
    documentation: 'https://developers.google.com/identity/protocols/oauth2',
    codeTemplates: {
      javascript: {
        vanilla: `// Google OAuth 2.0 Integration
class GoogleAuth {
  constructor(clientId, redirectUri) {
    this.clientId = clientId;
    this.redirectUri = redirectUri;
    this.scope = 'openid profile email';
    this.responseType = 'code';
  }

  // Generate OAuth URL
  getAuthUrl() {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: this.scope,
      response_type: this.responseType,
      state: this.generateState(),
      access_type: 'offline',
      prompt: 'consent'
    });

    return \`https://accounts.google.com/o/oauth2/v2/auth?\${params}\`;
  }

  // Generate state parameter for CSRF protection
  generateState() {
    const state = Math.random().toString(36).substring(2, 15) + 
                  Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('google_oauth_state', state);
    return state;
  }

  // Verify state parameter
  verifyState(receivedState) {
    const storedState = sessionStorage.getItem('google_oauth_state');
    sessionStorage.removeItem('google_oauth_state');
    return storedState === receivedState;
  }

  // Exchange authorization code for tokens
  async exchangeCodeForTokens(code, clientSecret) {
    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.clientId,
          client_secret: clientSecret,
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: this.redirectUri
        })
      });

      if (!response.ok) {
        throw new Error(\`Token exchange failed: \${response.status}\`);
      }

      const tokens = await response.json();
      
      // Store tokens securely
      this.storeTokens(tokens);
      
      return {
        success: true,
        tokens: tokens
      };
    } catch (error) {
      console.error('Token exchange error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Store tokens securely
  storeTokens(tokens) {
    localStorage.setItem('google_access_token', tokens.access_token);
    localStorage.setItem('google_refresh_token', tokens.refresh_token);
    
    if (tokens.expires_in) {
      const expiresAt = Date.now() + (tokens.expires_in * 1000);
      localStorage.setItem('google_token_expires_at', expiresAt.toString());
    }
  }

  // Get user profile
  async getUserProfile(accessToken = null) {
    try {
      const token = accessToken || localStorage.getItem('google_access_token');
      
      if (!token) {
        throw new Error('No access token available');
      }

      const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          'Authorization': \`Bearer \${token}\`
        }
      });

      if (!response.ok) {
        throw new Error(\`Profile fetch failed: \${response.status}\`);
      }

      const profile = await response.json();
      
      return {
        success: true,
        profile: profile
      };
    } catch (error) {
      console.error('Profile fetch error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Refresh access token
  async refreshAccessToken(clientSecret) {
    try {
      const refreshToken = localStorage.getItem('google_refresh_token');
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.clientId,
          client_secret: clientSecret,
          refresh_token: refreshToken,
          grant_type: 'refresh_token'
        })
      });

      if (!response.ok) {
        throw new Error(\`Token refresh failed: \${response.status}\`);
      }

      const tokens = await response.json();
      
      // Update stored access token
      localStorage.setItem('google_access_token', tokens.access_token);
      
      if (tokens.expires_in) {
        const expiresAt = Date.now() + (tokens.expires_in * 1000);
        localStorage.setItem('google_token_expires_at', expiresAt.toString());
      }
      
      return {
        success: true,
        accessToken: tokens.access_token
      };
    } catch (error) {
      console.error('Token refresh error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Check if token is expired
  isTokenExpired() {
    const expiresAt = localStorage.getItem('google_token_expires_at');
    if (!expiresAt) return true;
    
    return Date.now() >= parseInt(expiresAt);
  }

  // Logout
  logout() {
    localStorage.removeItem('google_access_token');
    localStorage.removeItem('google_refresh_token');
    localStorage.removeItem('google_token_expires_at');
  }

  // Handle callback
  handleCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');

    if (error) {
      console.error('OAuth error:', error);
      return { success: false, error: error };
    }

    if (!code || !state) {
      return { success: false, error: 'Missing code or state parameter' };
    }

    if (!this.verifyState(state)) {
      return { success: false, error: 'Invalid state parameter' };
    }

    return { success: true, code: code };
  }
}

// Usage example
const googleAuth = new GoogleAuth(
  'your-client-id.googleusercontent.com',
  'http://localhost:3000/callback'
);

// Login button handler
document.getElementById('loginBtn').addEventListener('click', () => {
  const authUrl = googleAuth.getAuthUrl();
  window.location.href = authUrl;
});

// Handle callback (on callback page)
const callbackResult = googleAuth.handleCallback();
if (callbackResult.success) {
  // Exchange code for tokens (requires client secret - do this on server)
  console.log('Authorization code:', callbackResult.code);
} else {
  console.error('Callback error:', callbackResult.error);
}

// Get user profile
if (!googleAuth.isTokenExpired()) {
  googleAuth.getUserProfile().then(result => {
    if (result.success) {
      console.log('User profile:', result.profile);
    }
  });
}`,
        react: `// Google OAuth React Integration
import React, { useState, useEffect, createContext, useContext } from 'react';

// Google Auth Context
const GoogleAuthContext = createContext();

export const useGoogleAuth = () => {
  const context = useContext(GoogleAuthContext);
  if (!context) {
    throw new Error('useGoogleAuth must be used within GoogleAuthProvider');
  }
  return context;
};

// Google Auth Provider
export const GoogleAuthProvider = ({ children, clientId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load Google Identity Services
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleAuth;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initializeGoogleAuth = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      
      // Check for existing session
      checkExistingSession();
    }
    setLoading(false);
  };

  const handleCredentialResponse = async (response) => {
    try {
      setLoading(true);
      setError(null);

      // Decode JWT token
      const userInfo = parseJwt(response.credential);
      
      // Store token
      localStorage.setItem('google_id_token', response.credential);
      
      setUser({
        id: userInfo.sub,
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture,
        verified: userInfo.email_verified
      });
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      throw new Error('Invalid token');
    }
  };

  const checkExistingSession = () => {
    const token = localStorage.getItem('google_id_token');
    if (token) {
      try {
        const userInfo = parseJwt(token);
        // Check if token is still valid (not expired)
        if (userInfo.exp * 1000 > Date.now()) {
          setUser({
            id: userInfo.sub,
            name: userInfo.name,
            email: userInfo.email,
            picture: userInfo.picture,
            verified: userInfo.email_verified
          });
        } else {
          localStorage.removeItem('google_id_token');
        }
      } catch (error) {
        localStorage.removeItem('google_id_token');
      }
    }
  };

  const signIn = () => {
    if (window.google) {
      window.google.accounts.id.prompt();
    }
  };

  const signInWithPopup = () => {
    if (window.google) {
      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        {
          type: 'standard',
          size: 'large',
          text: 'signin_with',
          theme: 'outline',
          logo_alignment: 'left',
          width: 250
        }
      );
    }
  };

  const signOut = () => {
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
    localStorage.removeItem('google_id_token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    signIn,
    signInWithPopup,
    signOut,
    isAuthenticated: !!user
  };

  return (
    <GoogleAuthContext.Provider value={value}>
      {children}
    </GoogleAuthContext.Provider>
  );
};

// Login Button Component
const GoogleLoginButton = () => {
  const { signIn, signInWithPopup, loading } = useGoogleAuth();
  const [usePopup, setUsePopup] = useState(false);

  useEffect(() => {
    if (usePopup) {
      signInWithPopup();
    }
  }, [usePopup, signInWithPopup]);

  return (
    <div className="google-login">
      <button
        onClick={() => setUsePopup(true)}
        disabled={loading}
        className="google-login-button"
      >
        {loading ? 'Loading...' : 'Sign in with Google'}
      </button>
      
      <div id="google-signin-button" style={{ marginTop: '10px' }}></div>
      
      <button
        onClick={signIn}
        disabled={loading}
        className="google-login-prompt"
      >
        Sign in (One Tap)
      </button>
    </div>
  );
};

// Profile Component
const GoogleProfile = () => {
  const { user, signOut } = useGoogleAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="google-profile">
      <div className="profile-header">
        <img
          src={user.picture}
          alt={user.name}
          className="profile-avatar"
          width={50}
          height={50}
        />
        <div className="profile-info">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          {user.verified && <span className="verified">✓ Verified</span>}
        </div>
      </div>
      
      <button onClick={signOut} className="sign-out-button">
        Sign Out
      </button>
    </div>
  );
};

// Main App Component
const App = () => {
  const { user, loading, error, isAuthenticated } = useGoogleAuth();

  if (loading) {
    return <div className="loading">Loading Google Auth...</div>;
  }

  return (
    <div className="app">
      <header>
        <h1>Google OAuth Example</h1>
      </header>

      <main>
        {error && (
          <div className="error-message">
            Error: {error}
          </div>
        )}

        {isAuthenticated ? (
          <div className="authenticated">
            <h2>Welcome!</h2>
            <GoogleProfile />
          </div>
        ) : (
          <div className="unauthenticated">
            <h2>Please sign in</h2>
            <GoogleLoginButton />
          </div>
        )}
      </main>
    </div>
  );
};

// Root Component
export default function AppWithGoogleAuth() {
  return (
    <GoogleAuthProvider clientId="your-client-id.googleusercontent.com">
      <App />
    </GoogleAuthProvider>
  );
}

// CSS styles (add to your stylesheet)
/*
.google-login-button,
.google-login-prompt {
  background: #4285f4;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin: 8px;
}

.google-login-button:hover {
  background: #357ae8;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.profile-avatar {
  border-radius: 50%;
}

.verified {
  color: #34a853;
  font-size: 12px;
}

.sign-out-button {
  background: #ea4335;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
*/`
      }
    }
  },

  // CLOUD STORAGE APIS  
  {
    id: 'aws-s3',
    slug: 'aws-s3',
    name: 'AWS S3',
    category: 'Cloud Storage',
    description: 'Scalable object storage service with advanced security, management, and analytics capabilities.',
    icon: '☁️',
    features: [
      'Object Upload/Download',
      'Presigned URLs',
      'Bucket Management',
      'Access Control (IAM)',
      'Server-side Encryption',
      'Lifecycle Policies'
    ],
    popularity: 96,
    documentation: 'https://docs.aws.amazon.com/s3/',
    codeTemplates: {
      javascript: {
        vanilla: `// AWS S3 JavaScript Integration
const AWS = require('aws-sdk');

class S3Service {
  constructor(accessKeyId, secretAccessKey, region = 'us-east-1') {
    // Configure AWS
    AWS.config.update({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: region
    });
    
    this.s3 = new AWS.S3();
    this.region = region;
  }

  // Upload file to S3
  async uploadFile(bucketName, key, fileData, options = {}) {
    try {
      const params = {
        Bucket: bucketName,
        Key: key,
        Body: fileData,
        ContentType: options.contentType || 'application/octet-stream',
        ...options
      };

      const result = await this.s3.upload(params).promise();
      
      return {
        success: true,
        location: result.Location,
        etag: result.ETag,
        key: result.Key
      };
    } catch (error) {
      console.error('S3 Upload Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Download file from S3
  async downloadFile(bucketName, key) {
    try {
      const params = {
        Bucket: bucketName,
        Key: key
      };

      const result = await this.s3.getObject(params).promise();
      
      return {
        success: true,
        data: result.Body,
        contentType: result.ContentType,
        lastModified: result.LastModified,
        etag: result.ETag
      };
    } catch (error) {
      console.error('S3 Download Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Generate presigned URL for upload
  getPresignedUploadUrl(bucketName, key, expiresIn = 300, contentType = null) {
    try {
      const params = {
        Bucket: bucketName,
        Key: key,
        Expires: expiresIn
      };

      if (contentType) {
        params.ContentType = contentType;
      }

      const url = this.s3.getSignedUrl('putObject', params);
      
      return {
        success: true,
        url: url,
        expiresIn: expiresIn
      };
    } catch (error) {
      console.error('Presigned URL Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Generate presigned URL for download
  getPresignedDownloadUrl(bucketName, key, expiresIn = 300) {
    try {
      const params = {
        Bucket: bucketName,
        Key: key,
        Expires: expiresIn
      };

      const url = this.s3.getSignedUrl('getObject', params);
      
      return {
        success: true,
        url: url,
        expiresIn: expiresIn
      };
    } catch (error) {
      console.error('Presigned URL Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // List objects in bucket
  async listObjects(bucketName, prefix = '', maxKeys = 1000) {
    try {
      const params = {
        Bucket: bucketName,
        Prefix: prefix,
        MaxKeys: maxKeys
      };

      const result = await this.s3.listObjectsV2(params).promise();
      
      return {
        success: true,
        objects: result.Contents.map(obj => ({
          key: obj.Key,
          size: obj.Size,
          lastModified: obj.LastModified,
          etag: obj.ETag
        })),
        totalCount: result.KeyCount,
        isTruncated: result.IsTruncated,
        nextContinuationToken: result.NextContinuationToken
      };
    } catch (error) {
      console.error('S3 List Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Delete object from S3
  async deleteFile(bucketName, key) {
    try {
      const params = {
        Bucket: bucketName,
        Key: key
      };

      await this.s3.deleteObject(params).promise();
      
      return {
        success: true,
        message: 'Object deleted successfully'
      };
    } catch (error) {
      console.error('S3 Delete Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Delete multiple objects
  async deleteFiles(bucketName, keys) {
    try {
      const params = {
        Bucket: bucketName,
        Delete: {
          Objects: keys.map(key => ({ Key: key })),
          Quiet: false
        }
      };

      const result = await this.s3.deleteObjects(params).promise();
      
      return {
        success: true,
        deleted: result.Deleted,
        errors: result.Errors
      };
    } catch (error) {
      console.error('S3 Bulk Delete Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Copy object within S3
  async copyFile(sourceBucket, sourceKey, destBucket, destKey) {
    try {
      const params = {
        CopySource: \`\${sourceBucket}/\${sourceKey}\`,
        Bucket: destBucket,
        Key: destKey
      };

      const result = await this.s3.copyObject(params).promise();
      
      return {
        success: true,
        etag: result.ETag,
        lastModified: result.LastModified
      };
    } catch (error) {
      console.error('S3 Copy Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get object metadata
  async getObjectMetadata(bucketName, key) {
    try {
      const params = {
        Bucket: bucketName,
        Key: key
      };

      const result = await this.s3.headObject(params).promise();
      
      return {
        success: true,
        metadata: {
          contentType: result.ContentType,
          contentLength: result.ContentLength,
          lastModified: result.LastModified,
          etag: result.ETag,
          storageClass: result.StorageClass,
          metadata: result.Metadata
        }
      };
    } catch (error) {
      console.error('S3 Metadata Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Create multipart upload
  async createMultipartUpload(bucketName, key, contentType) {
    try {
      const params = {
        Bucket: bucketName,
        Key: key,
        ContentType: contentType
      };

      const result = await this.s3.createMultipartUpload(params).promise();
      
      return {
        success: true,
        uploadId: result.UploadId
      };
    } catch (error) {
      console.error('Multipart Upload Creation Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Usage examples
const s3 = new S3Service(
  'your-access-key-id',
  'your-secret-access-key',
  'us-east-1'
);

// Upload a file
async function uploadExample() {
  const fileData = Buffer.from('Hello, S3!');
  const result = await s3.uploadFile('my-bucket', 'hello.txt', fileData, {
    contentType: 'text/plain'
  });
  
  if (result.success) {
    console.log('File uploaded:', result.location);
  } else {
    console.error('Upload failed:', result.error);
  }
}

// Generate presigned URL
async function presignedUrlExample() {
  const result = s3.getPresignedUploadUrl('my-bucket', 'upload.jpg', 300, 'image/jpeg');
  
  if (result.success) {
    console.log('Presigned URL:', result.url);
    // Use this URL to upload directly from browser
  }
}

// List objects
async function listExample() {
  const result = await s3.listObjects('my-bucket', 'uploads/');
  
  if (result.success) {
    console.log('Objects:', result.objects);
  }
}

uploadExample();`,
        react: `// AWS S3 React Integration
import React, { useState, useCallback, useRef } from 'react';
import AWS from 'aws-sdk';

// Configure AWS (do this at app level)
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION
});

const s3 = new AWS.S3();

// Hook for S3 operations
const useS3 = (bucketName) => {
  const [uploading, setUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);

  const uploadFile = useCallback(async (file, key, options = {}) => {
    setUploading(true);
    setError('');
    setProgress(0);

    try {
      const params = {
        Bucket: bucketName,
        Key: key || file.name,
        Body: file,
        ContentType: file.type,
        ...options
      };

      const upload = s3.upload(params);

      // Track upload progress
      upload.on('httpUploadProgress', (evt) => {
        const progress = Math.round((evt.loaded / evt.total) * 100);
        setProgress(progress);
      });

      const result = await upload.promise();
      
      return {
        success: true,
        location: result.Location,
        key: result.Key,
        etag: result.ETag
      };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setUploading(false);
    }
  }, [bucketName]);

  const downloadFile = useCallback(async (key) => {
    try {
      const params = {
        Bucket: bucketName,
        Key: key
      };

      const result = await s3.getObject(params).promise();
      
      // Create blob URL for download
      const blob = new Blob([result.Body], { type: result.ContentType });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      
      return { success: true, url, data: result.Body };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  }, [bucketName]);

  const getPresignedUrl = useCallback((key, expiresIn = 300, operation = 'getObject') => {
    try {
      const params = {
        Bucket: bucketName,
        Key: key,
        Expires: expiresIn
      };

      const url = s3.getSignedUrl(operation, params);
      return { success: true, url };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  }, [bucketName]);

  const listObjects = useCallback(async (prefix = '') => {
    try {
      const params = {
        Bucket: bucketName,
        Prefix: prefix
      };

      const result = await s3.listObjectsV2(params).promise();
      
      return {
        success: true,
        objects: result.Contents?.map(obj => ({
          key: obj.Key,
          size: obj.Size,
          lastModified: obj.LastModified
        })) || []
      };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  }, [bucketName]);

  const deleteFile = useCallback(async (key) => {
    try {
      const params = {
        Bucket: bucketName,
        Key: key
      };

      await s3.deleteObject(params).promise();
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  }, [bucketName]);

  return {
    uploadFile,
    downloadFile,
    getPresignedUrl,
    listObjects,
    deleteFile,
    uploading,
    downloadUrl,
    error,
    progress
  };
};

// File Upload Component
const FileUploader = ({ bucketName, onUploadComplete }) => {
  const { uploadFile, uploading, progress, error } = useS3(bucketName);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (files) => {
    if (files && files.length > 0) {
      uploadFiles(Array.from(files));
    }
  };

  const uploadFiles = async (files) => {
    for (const file of files) {
      const result = await uploadFile(file);
      if (result.success && onUploadComplete) {
        onUploadComplete(result);
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  return (
    <div className="file-uploader">
      <div
        className={\`upload-area \${dragActive ? 'drag-active' : ''} \${uploading ? 'uploading' : ''}\`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          style={{ display: 'none' }}
        />
        
        {uploading ? (
          <div className="upload-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: \`\${progress}%\` }}
              />
            </div>
            <p>Uploading... {progress}%</p>
          </div>
        ) : (
          <div className="upload-prompt">
            <div className="upload-icon">📁</div>
            <p>Click or drag files here to upload</p>
            <span className="upload-hint">Supports all file types</span>
          </div>
        )}
      </div>

      {error && (
        <div className="error-message">
          Error: {error}
        </div>
      )}
    </div>
  );
};

// File Browser Component
const FileBrowser = ({ bucketName }) => {
  const { listObjects, deleteFile, getPresignedUrl } = useS3(bucketName);
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPrefix, setSelectedPrefix] = useState('');

  useEffect(() => {
    loadObjects();
  }, [selectedPrefix]);

  const loadObjects = async () => {
    setLoading(true);
    const result = await listObjects(selectedPrefix);
    if (result.success) {
      setObjects(result.objects);
    }
    setLoading(false);
  };

  const handleDelete = async (key) => {
    if (window.confirm(\`Delete \${key}?\`)) {
      const result = await deleteFile(key);
      if (result.success) {
        await loadObjects(); // Refresh list
      }
    }
  };

  const handleDownload = async (key) => {
    const result = getPresignedUrl(key, 300);
    if (result.success) {
      window.open(result.url, '_blank');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="file-browser">
      <div className="browser-header">
        <h3>Files in {bucketName}</h3>
        <div className="prefix-input">
          <input
            type="text"
            value={selectedPrefix}
            onChange={(e) => setSelectedPrefix(e.target.value)}
            placeholder="Filter by prefix..."
          />
          <button onClick={loadObjects}>Refresh</button>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading files...</div>
      ) : (
        <div className="file-list">
          {objects.length === 0 ? (
            <div className="empty-state">
              No files found {selectedPrefix && \`with prefix "\${selectedPrefix}"\`}
            </div>
          ) : (
            <table className="files-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Size</th>
                  <th>Modified</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {objects.map((object) => (
                  <tr key={object.key}>
                    <td className="file-name">{object.key}</td>
                    <td>{formatFileSize(object.size)}</td>
                    <td>{new Date(object.lastModified).toLocaleDateString()}</td>
                    <td className="file-actions">
                      <button onClick={() => handleDownload(object.key)}>
                        Download
                      </button>
                      <button 
                        onClick={() => handleDelete(object.key)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

// Main S3 App Component
const S3App = () => {
  const bucketName = process.env.REACT_APP_S3_BUCKET_NAME;
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleUploadComplete = (result) => {
    setUploadedFiles(prev => [...prev, result]);
    console.log('File uploaded:', result);
  };

  return (
    <div className="s3-app">
      <header>
        <h1>AWS S3 File Manager</h1>
        <div className="bucket-info">Bucket: {bucketName}</div>
      </header>

      <div className="tab-navigation">
        <button
          className={activeTab === 'upload' ? 'active' : ''}
          onClick={() => setActiveTab('upload')}
        >
          Upload Files
        </button>
        <button
          className={activeTab === 'browse' ? 'active' : ''}
          onClick={() => setActiveTab('browse')}
        >
          Browse Files
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'upload' ? (
          <div className="upload-tab">
            <FileUploader
              bucketName={bucketName}
              onUploadComplete={handleUploadComplete}
            />
            
            {uploadedFiles.length > 0 && (
              <div className="upload-results">
                <h3>Recently Uploaded</h3>
                <ul>
                  {uploadedFiles.map((file, index) => (
                    <li key={index}>
                      <strong>{file.key}</strong> - {file.location}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="browse-tab">
            <FileBrowser bucketName={bucketName} />
          </div>
        )}
      </div>
    </div>
  );
};

export default S3App;

// Environment variables needed (.env):
// REACT_APP_AWS_ACCESS_KEY_ID=your_access_key_id
// REACT_APP_AWS_SECRET_ACCESS_KEY=your_secret_access_key
// REACT_APP_AWS_REGION=us-east-1
// REACT_APP_S3_BUCKET_NAME=your-bucket-name`
      }
    }
  },

  // AI/ML APIS
  {
    id: 'openai',
    slug: 'openai',
    name: 'OpenAI',
    category: 'AI/ML',
    description: 'Advanced AI capabilities including GPT models, embeddings, and image generation with DALL-E.',
    icon: '🤖',
    features: [
      'GPT-4 Chat Completions',
      'Text Embeddings',
      'DALL-E Image Generation',
      'Whisper Speech-to-Text',
      'Function Calling',
      'Fine-tuning Support'
    ],
    popularity: 99,
    documentation: 'https://platform.openai.com/docs',
    codeTemplates: {
      javascript: {
        vanilla: `// OpenAI API Integration
const OpenAI = require('openai');

class OpenAIService {
  constructor(apiKey) {
    this.openai = new OpenAI({
      apiKey: apiKey
    });
  }

  // Generate text completion using GPT
  async generateCompletion(prompt, options = {}) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: options.model || 'gpt-4',
        messages: [
          {
            role: 'system',
            content: options.systemMessage || 'You are a helpful assistant.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: options.maxTokens || 150,
        temperature: options.temperature || 0.7,
        top_p: options.topP || 1,
        frequency_penalty: options.frequencyPenalty || 0,
        presence_penalty: options.presencePenalty || 0
      });

      return {
        success: true,
        text: completion.choices[0].message.content,
        usage: completion.usage,
        model: completion.model
      };
    } catch (error) {
      console.error('OpenAI Completion Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Generate streaming completion
  async generateStreamingCompletion(prompt, onChunk, options = {}) {
    try {
      const stream = await this.openai.chat.completions.create({
        model: options.model || 'gpt-4',
        messages: [
          {
            role: 'system',
            content: options.systemMessage || 'You are a helpful assistant.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: options.maxTokens || 150,
        temperature: options.temperature || 0.7,
        stream: true
      });

      let fullText = '';
      
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        fullText += content;
        
        if (onChunk) {
          onChunk(content, fullText);
        }
      }

      return {
        success: true,
        text: fullText
      };
    } catch (error) {
      console.error('OpenAI Streaming Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Generate text embeddings
  async generateEmbeddings(texts, options = {}) {
    try {
      const textsArray = Array.isArray(texts) ? texts : [texts];
      
      const response = await this.openai.embeddings.create({
        model: options.model || 'text-embedding-ada-002',
        input: textsArray
      });

      return {
        success: true,
        embeddings: response.data.map(item => item.embedding),
        usage: response.usage
      };
    } catch (error) {
      console.error('OpenAI Embeddings Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Generate images with DALL-E
  async generateImage(prompt, options = {}) {
    try {
      const response = await this.openai.images.generate({
        model: options.model || 'dall-e-3',
        prompt: prompt,
        n: options.n || 1,
        size: options.size || '1024x1024',
        quality: options.quality || 'standard',
        style: options.style || 'vivid'
      });

      return {
        success: true,
        images: response.data.map(item => ({
          url: item.url,
          revised_prompt: item.revised_prompt
        }))
      };
    } catch (error) {
      console.error('OpenAI Image Generation Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Transcribe audio with Whisper
  async transcribeAudio(audioFile, options = {}) {
    try {
      const transcription = await this.openai.audio.transcriptions.create({
        file: audioFile,
        model: options.model || 'whisper-1',
        language: options.language,
        prompt: options.prompt,
        response_format: options.responseFormat || 'json',
        temperature: options.temperature || 0
      });

      return {
        success: true,
        text: transcription.text,
        language: transcription.language
      };
    } catch (error) {
      console.error('OpenAI Transcription Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Generate speech from text
  async generateSpeech(text, options = {}) {
    try {
      const mp3 = await this.openai.audio.speech.create({
        model: options.model || 'tts-1',
        voice: options.voice || 'alloy',
        input: text,
        response_format: options.responseFormat || 'mp3',
        speed: options.speed || 1.0
      });

      const buffer = Buffer.from(await mp3.arrayBuffer());
      
      return {
        success: true,
        audio: buffer
      };
    } catch (error) {
      console.error('OpenAI Speech Generation Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Function calling with GPT
  async callFunction(prompt, functions, options = {}) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: options.model || 'gpt-4',
        messages: [
          {
            role: 'system',
            content: options.systemMessage || 'You are a helpful assistant that can call functions.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        functions: functions,
        function_call: options.functionCall || 'auto',
        temperature: options.temperature || 0.1
      });

      const message = completion.choices[0].message;

      if (message.function_call) {
        return {
          success: true,
          functionCall: {
            name: message.function_call.name,
            arguments: JSON.parse(message.function_call.arguments)
          },
          message: message.content,
          usage: completion.usage
        };
      }

      return {
        success: true,
        message: message.content,
        usage: completion.usage
      };
    } catch (error) {
      console.error('OpenAI Function Call Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Chat with conversation history
  async chat(messages, options = {}) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: options.model || 'gpt-4',
        messages: messages,
        max_tokens: options.maxTokens || 150,
        temperature: options.temperature || 0.7
      });

      const responseMessage = completion.choices[0].message;

      return {
        success: true,
        message: responseMessage,
        usage: completion.usage,
        model: completion.model
      };
    } catch (error) {
      console.error('OpenAI Chat Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Usage examples
const openai = new OpenAIService('your-openai-api-key');

// Generate a completion
async function completionExample() {
  const result = await openai.generateCompletion(
    'Write a short story about a robot learning to paint.',
    {
      model: 'gpt-4',
      maxTokens: 200,
      temperature: 0.8
    }
  );

  if (result.success) {
    console.log('Generated text:', result.text);
    console.log('Tokens used:', result.usage);
  } else {
    console.error('Error:', result.error);
  }
}

// Generate embeddings
async function embeddingsExample() {
  const texts = [
    'The quick brown fox jumps over the lazy dog',
    'Machine learning is a subset of artificial intelligence',
    'JavaScript is a programming language'
  ];

  const result = await openai.generateEmbeddings(texts);

  if (result.success) {
    console.log('Embeddings generated:', result.embeddings.length);
    console.log('First embedding dimension:', result.embeddings[0].length);
  }
}

// Generate image
async function imageExample() {
  const result = await openai.generateImage(
    'A serene landscape with mountains and a lake at sunset',
    {
      size: '1024x1024',
      quality: 'hd',
      n: 1
    }
  );

  if (result.success) {
    console.log('Image URL:', result.images[0].url);
  }
}

// Streaming completion
async function streamingExample() {
  console.log('Streaming response:');
  
  const result = await openai.generateStreamingCompletion(
    'Explain quantum computing in simple terms.',
    (chunk, fullText) => {
      process.stdout.write(chunk);
    },
    {
      model: 'gpt-4',
      maxTokens: 200
    }
  );

  console.log('\\nStreaming complete:', result.success);
}

// Function calling example
async function functionCallExample() {
  const functions = [
    {
      name: 'get_weather',
      description: 'Get the current weather for a location',
      parameters: {
        type: 'object',
        properties: {
          location: {
            type: 'string',
            description: 'The city and state, e.g. San Francisco, CA'
          }
        },
        required: ['location']
      }
    }
  ];

  const result = await openai.callFunction(
    'What\'s the weather like in New York?',
    functions
  );

  if (result.success && result.functionCall) {
    console.log('Function to call:', result.functionCall.name);
    console.log('Arguments:', result.functionCall.arguments);
  }
}

completionExample();`,
        react: `// OpenAI React Integration
import React, { useState, useEffect, useRef } from 'react';
import OpenAI from 'openai';

// OpenAI Hook
const useOpenAI = (apiKey) => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (apiKey) {
      const openaiClient = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Only for demo - use server-side in production
      });
      setClient(openaiClient);
    }
  }, [apiKey]);

  const generateCompletion = async (prompt, options = {}) => {
    if (!client) throw new Error('OpenAI client not initialized');

    setLoading(true);
    setError('');

    try {
      const completion = await client.chat.completions.create({
        model: options.model || 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: options.systemMessage || 'You are a helpful assistant.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: options.maxTokens || 150,
        temperature: options.temperature || 0.7
      });

      return {
        success: true,
        text: completion.choices[0].message.content,
        usage: completion.usage
      };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const generateImage = async (prompt, options = {}) => {
    if (!client) throw new Error('OpenAI client not initialized');

    setLoading(true);
    setError('');

    try {
      const response = await client.images.generate({
        model: 'dall-e-2', // Use dall-e-2 for browser compatibility
        prompt: prompt,
        n: options.n || 1,
        size: options.size || '512x512'
      });

      return {
        success: true,
        images: response.data.map(item => ({ url: item.url }))
      };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    generateCompletion,
    generateImage,
    loading,
    error,
    isReady: !!client
  };
};

// Chat Component
const ChatComponent = ({ apiKey }) => {
  const { generateCompletion, loading, error } = useOpenAI(apiKey);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const result = await generateCompletion(input, {
      model: 'gpt-3.5-turbo',
      maxTokens: 200,
      temperature: 0.7
    });

    if (result.success) {
      const assistantMessage = { role: 'assistant', content: result.text };
      setMessages(prev => [...prev, assistantMessage]);
    } else {
      const errorMessage = { role: 'error', content: \`Error: \${result.error}\` };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div className="chat-component">
      <div className="chat-header">
        <h3>AI Chat Assistant</h3>
        <span className="model-info">GPT-3.5 Turbo</span>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="empty-state">
            <p>Start a conversation with the AI assistant!</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div key={index} className={\`message message-\${message.role}\`}>
              <div className="message-content">
                {message.content}
              </div>
              <div className="message-role">{message.role}</div>
            </div>
          ))
        )}
        {loading && (
          <div className="message message-assistant">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()}>
          Send
        </button>
      </form>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
};

// Image Generation Component
const ImageGenerator = ({ apiKey }) => {
  const { generateImage, loading, error } = useOpenAI(apiKey);
  const [prompt, setPrompt] = useState('');
  const [generatedImages, setGeneratedImages] = useState([]);
  const [imageSize, setImageSize] = useState('512x512');

  const generateImages = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    const result = await generateImage(prompt, {
      size: imageSize,
      n: 1
    });

    if (result.success) {
      setGeneratedImages(prev => [...prev, {
        prompt,
        url: result.images[0].url,
        timestamp: new Date()
      }]);
    }
  };

  return (
    <div className="image-generator">
      <div className="generator-header">
        <h3>AI Image Generator</h3>
        <span className="model-info">DALL-E 2</span>
      </div>

      <form onSubmit={generateImages} className="generator-form">
        <div className="form-group">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate..."
            rows={3}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Image Size:</label>
          <select
            value={imageSize}
            onChange={(e) => setImageSize(e.target.value)}
            disabled={loading}
          >
            <option value="256x256">256x256</option>
            <option value="512x512">512x512</option>
            <option value="1024x1024">1024x1024</option>
          </select>
        </div>

        <button type="submit" disabled={loading || !prompt.trim()}>
          {loading ? 'Generating...' : 'Generate Image'}
        </button>
      </form>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="generated-images">
        {generatedImages.length === 0 ? (
          <div className="empty-state">
            <p>Generated images will appear here</p>
          </div>
        ) : (
          <div className="images-grid">
            {generatedImages.map((item, index) => (
              <div key={index} className="image-card">
                <img src={item.url} alt={item.prompt} />
                <div className="image-info">
                  <p className="image-prompt">{item.prompt}</p>
                  <p className="image-timestamp">
                    {item.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Text Completion Component
const TextCompletion = ({ apiKey }) => {
  const { generateCompletion, loading, error } = useOpenAI(apiKey);
  const [prompt, setPrompt] = useState('');
  const [completion, setCompletion] = useState('');
  const [model, setModel] = useState('gpt-3.5-turbo');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(150);

  const generateText = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    const result = await generateCompletion(prompt, {
      model,
      temperature,
      maxTokens
    });

    if (result.success) {
      setCompletion(result.text);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(completion);
  };

  return (
    <div className="text-completion">
      <div className="completion-header">
        <h3>Text Completion</h3>
        <span className="model-info">{model}</span>
      </div>

      <form onSubmit={generateText} className="completion-form">
        <div className="form-group">
          <label>Prompt:</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            rows={4}
            disabled={loading}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Model:</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              disabled={loading}
            >
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="gpt-4">GPT-4</option>
            </select>
          </div>

          <div className="form-group">
            <label>Temperature: {temperature}</label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Max Tokens:</label>
            <input
              type="number"
              min="1"
              max="4000"
              value={maxTokens}
              onChange={(e) => setMaxTokens(parseInt(e.target.value))}
              disabled={loading}
            />
          </div>
        </div>

        <button type="submit" disabled={loading || !prompt.trim()}>
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </form>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {completion && (
        <div className="completion-result">
          <div className="result-header">
            <h4>Generated Text:</h4>
            <button onClick={copyToClipboard} className="copy-button">
              Copy
            </button>
          </div>
          <div className="result-content">
            {completion}
          </div>
        </div>
      )}
    </div>
  );
};

// Main OpenAI App
const OpenAIApp = () => {
  const [apiKey, setApiKey] = useState(process.env.REACT_APP_OPENAI_API_KEY || '');
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="openai-app">
      <header className="app-header">
        <h1>OpenAI Integration Demo</h1>
        
        {!process.env.REACT_APP_OPENAI_API_KEY && (
          <div className="api-key-input">
            <input
              type="password"
              placeholder="Enter OpenAI API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
        )}
      </header>

      <div className="tab-navigation">
        <button
          className={activeTab === 'chat' ? 'active' : ''}
          onClick={() => setActiveTab('chat')}
        >
          Chat
        </button>
        <button
          className={activeTab === 'completion' ? 'active' : ''}
          onClick={() => setActiveTab('completion')}
        >
          Text Completion
        </button>
        <button
          className={activeTab === 'images' ? 'active' : ''}
          onClick={() => setActiveTab('images')}
        >
          Image Generation
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'chat' && <ChatComponent apiKey={apiKey} />}
        {activeTab === 'completion' && <TextCompletion apiKey={apiKey} />}
        {activeTab === 'images' && <ImageGenerator apiKey={apiKey} />}
      </div>
    </div>
  );
};

export default OpenAIApp;

// Environment variables needed (.env):
// REACT_APP_OPENAI_API_KEY=your_openai_api_key_here

// Note: In production, API calls should be made from your backend
// to keep the API key secure. This is for demonstration purposes.`
      }
    }
  }
  
  // Add more API templates here for the remaining categories...
]

export const categories: Category[] = [
  {
    id: 'payment',
    name: 'Payment Processing',
    description: 'Accept payments, manage subscriptions, and handle transactions securely.',
    count: 15,
    popularAPIs: ['Stripe', 'PayPal', 'Square']
  },
  {
    id: 'auth',
    name: 'Authentication',
    description: 'Secure user authentication, OAuth, and identity management.',
    count: 20,
    popularAPIs: ['Auth0', 'Firebase Auth', 'Google OAuth']
  },
  {
    id: 'storage',
    name: 'Cloud Storage',
    description: 'Store, manage, and deliver files and media content.',
    count: 12,
    popularAPIs: ['AWS S3', 'Google Cloud', 'Cloudinary']
  },
  {
    id: 'ai',
    name: 'AI/ML',
    description: 'Integrate artificial intelligence and machine learning capabilities.',
    count: 15,
    popularAPIs: ['OpenAI', 'Anthropic', 'Hugging Face']
  },
  {
    id: 'database',
    name: 'Database',
    description: 'Database services and data management solutions.',
    count: 10,
    popularAPIs: ['Supabase', 'MongoDB', 'PlanetScale']
  },
  {
    id: 'communication',
    name: 'Communication',
    description: 'Email, SMS, push notifications, and messaging services.',
    count: 12,
    popularAPIs: ['Twilio', 'SendGrid', 'Pusher']
  },
  {
    id: 'social',
    name: 'Social Media',
    description: 'Social platform integrations and social authentication.',
    count: 8,
    popularAPIs: ['Twitter API', 'Facebook Graph', 'Instagram']
  },
  {
    id: 'maps',
    name: 'Maps & Location',
    description: 'Mapping, geolocation, and location-based services.',
    count: 6,
    popularAPIs: ['Google Maps', 'Mapbox', 'HERE Maps']
  },
  {
    id: 'analytics',
    name: 'Analytics',
    description: 'Track user behavior, performance, and business metrics.',
    count: 8,
    popularAPIs: ['Google Analytics', 'Mixpanel', 'Amplitude']
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Shopping cart, inventory, and e-commerce functionality.',
    count: 10,
    popularAPIs: ['Shopify', 'WooCommerce', 'BigCommerce']
  },
  {
    id: 'productivity',
    name: 'Productivity',
    description: 'Document management, calendars, and workflow automation.',
    count: 9,
    popularAPIs: ['Google Workspace', 'Microsoft 365', 'Notion']
  },
  {
    id: 'media',
    name: 'Media Processing',
    description: 'Image, video, and audio processing and manipulation.',
    count: 7,
    popularAPIs: ['Cloudinary', 'ImageKit', 'Mux']
  }
]

// Helper functions
export function getAllAPIs(): APITemplate[] {
  return apiTemplates
}

export function getAPIBySlug(slug: string): APITemplate | null {
  return apiTemplates.find(api => api.slug === slug) || null
}

export function getAPIsByCategory(category: string): APITemplate[] {
  if (category === 'all') return apiTemplates
  return apiTemplates.filter(api => api.category.toLowerCase().includes(category.toLowerCase()))
}

export function getCategories(): Category[] {
  return categories
}

export function getPopularAPIs(): APITemplate[] {
  return apiTemplates
    .filter(api => api.popularity && api.popularity >= 90)
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    .slice(0, 9)
}

export function getCategoryIcon(categoryId: string): string {
  const icons: Record<string, string> = {
    'payment': '💳',
    'auth': '🔐',
    'storage': '☁️',
    'ai': '🤖',
    'database': '🗄️',
    'communication': '📨',
    'social': '👥',
    'maps': '🗺️',
    'analytics': '📊',
    'ecommerce': '🛒',
    'productivity': '⚡',
    'media': '🎬'
  }
  
  return icons[categoryId] || '🔧'
}
