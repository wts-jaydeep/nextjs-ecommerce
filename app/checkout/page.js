'use client';

import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast'; // For displaying a success message

export default function CheckoutPage() {
  const { cartItems, setCartItems } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Redirect to cart page if cart is empty
  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      router.push('/cart');
    }
  }, [cartItems, router]);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    
    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Valid email is required";
    }
    if (!formData.address) formErrors.address = "Shipping address is required";
    if (!formData.cardNumber || !/^\d{16}$/.test(formData.cardNumber)) {
      formErrors.cardNumber = "Valid card number is required";
    }
    if (!formData.cardExpiry || !/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
      formErrors.cardExpiry = "Expiry date must be in MM/YY format";
    }
    if (!formData.cardCVC || !/^\d{3,4}$/.test(formData.cardCVC)) {
      formErrors.cardCVC = "Valid CVC is required";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return toast.error('Please correct the errors before submitting');
    }

    setLoading(true);

    // Simulate order processing (you can replace this with a real API call)
    setTimeout(() => {
      setLoading(false);

      // Clear cart items after successful order
      setCartItems([]);

      // Display a success toast message
      toast.success('Order placed successfully!');

      // Clear form fields
      setFormData({
        name: '',
        email: '',
        address: '',
        cardNumber: '',
        cardExpiry: '',
        cardCVC: '',
      });

      // Redirect to home page after form submission
      router.push('/');
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster /> {/* For displaying the toast message */}
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full border p-2 rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full border p-2 rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label className="block mb-1">Shipping Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className={`w-full border p-2 rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>

        <h2 className="text-xl font-bold">Payment Details</h2>
        <div>
          <label className="block mb-1">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            className={`w-full border p-2 rounded-md ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block mb-1">Expiry Date (MM/YY)</label>
            <input
              type="text"
              name="cardExpiry"
              value={formData.cardExpiry}
              onChange={handleInputChange}
              className={`w-full border p-2 rounded-md ${errors.cardExpiry ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.cardExpiry && <p className="text-red-500 text-sm">{errors.cardExpiry}</p>}
          </div>
          <div className="w-1/2">
            <label className="block mb-1">CVC</label>
            <input
              type="text"
              name="cardCVC"
              value={formData.cardCVC}
              onChange={handleInputChange}
              className={`w-full border p-2 rounded-md ${errors.cardCVC ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.cardCVC && <p className="text-red-500 text-sm">{errors.cardCVC}</p>}
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <h2 className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</h2>
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Complete Purchase'}
          </button>
        </div>
      </form>
    </div>
  );
}
