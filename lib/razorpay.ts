export async function loadRazorpay(): Promise<boolean> {
  // For testing environment, use mock implementation
  if (process.env.NODE_ENV === 'development' || !window?.document) {
    console.log('Using mock Razorpay implementation for testing');
    (window as any).Razorpay = MockRazorpay;
    return true;
  }

  // Production implementation - load the actual script
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true

    script.onload = () => {
      resolve(true)
    }

    script.onerror = () => {
      resolve(false)
    }

    document.body.appendChild(script)
  })
}

// Mock Razorpay implementation for testing
class MockRazorpay {
  options: any;

  constructor(options: any) {
    this.options = options;
    console.log('Mock Razorpay initialized with options:', options);
  }

  open() {
    console.log('Mock Razorpay payment window opened');
    
    // Simulate a successful payment after a short delay
    setTimeout(() => {
      if (this.options.handler) {
        console.log('Simulating successful payment');
        this.options.handler({
          razorpay_payment_id: 'mock_payment_' + Date.now(),
          razorpay_order_id: this.options.order_id,
          razorpay_signature: 'mock_signature_' + Date.now(),
        });
      }
    }, 2000);
  }
}
