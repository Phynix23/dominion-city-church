// src/pages/Give.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaCreditCard, FaUniversity, FaMobileAlt, FaBitcoin, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Give.css';

const Give = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardName: '',
    email: ''
  });

  const amountPresets = [5000, 10000, 20000, 50000, 100000];

  const handleAmountSelect = (value) => {
    setAmount(value.toString());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCardPayment = (e) => {
    e.preventDefault();
    if (!amount) {
      toast.error('Please enter an amount');
      return;
    }
    toast.success(`Processing payment of ₦${amount}...`);
    // Integrate payment gateway here
  };

  const handleCopyDetails = () => {
    const details = `Dominion City Church\nFirst Bank of Nigeria\nAccount: 2023456789\nSort Code: 011`;
    navigator.clipboard.writeText(details);
    toast.success('Bank details copied to clipboard!');
  };

  return (
    <>
      <Helmet>
        <title>Give | Seeds of Dominion</title>
        <meta name="description" content="Support the vision of Dominion City through tithes, offerings, and special projects." />
      </Helmet>

      <main>
        <section className="give-hero">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1>Seeds of Dominion</h1>
              <p>Partner with us to raise leaders and impact generations</p>
            </motion.div>
          </div>
        </section>

        <section className="give-main">
          <div className="container">
            <div className="give-container">
              <div className="amount-section">
                <h3>Select Amount</h3>
                <div className="amount-presets">
                  {amountPresets.map(preset => (
                    <button
                      key={preset}
                      className={`amount-btn ${amount === preset.toString() ? 'active' : ''}`}
                      onClick={() => handleAmountSelect(preset)}
                    >
                      ₦{preset.toLocaleString()}
                    </button>
                  ))}
                  <input
                    type="number"
                    placeholder="Custom Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="custom-amount"
                  />
                </div>
              </div>

              <div className="payment-methods">
                <h3>Payment Method</h3>
                <div className="methods-grid">
                  <button
                    className={`method-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <FaCreditCard /> Card Payment
                  </button>
                  <button
                    className={`method-btn ${paymentMethod === 'bank' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('bank')}
                  >
                    <FaUniversity /> Bank Transfer
                  </button>
                  <button
                    className={`method-btn ${paymentMethod === 'ussd' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('ussd')}
                  >
                    <FaMobileAlt /> USSD
                  </button>
                  <button
                    className={`method-btn ${paymentMethod === 'crypto' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('crypto')}
                  >
                    <FaBitcoin /> Crypto
                  </button>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <motion.form
                  className="card-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleCardPayment}
                >
                  <div className="form-group">
                    <label>Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Cardholder Name</label>
                    <input
                      type="text"
                      name="cardName"
                      placeholder="John Doe"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email (for receipt)</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    <FaLock /> Pay ₦{amount ? parseInt(amount).toLocaleString() : '0'}
                  </button>
                </motion.form>
              )}

              {paymentMethod === 'bank' && (
                <motion.div
                  className="bank-details"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bank-info">
                    <h4>Bank Transfer Details</h4>
                    <div className="detail-item">
                      <span>Bank:</span>
                      <strong>First Bank of Nigeria</strong>
                    </div>
                    <div className="detail-item">
                      <span>Account Name:</span>
                      <strong>Dominion City Church</strong>
                    </div>
                    <div className="detail-item">
                      <span>Account Number:</span>
                      <strong>2023456789</strong>
                    </div>
                    <div className="detail-item">
                      <span>Sort Code:</span>
                      <strong>011</strong>
                    </div>
                    <button className="btn btn-outline" onClick={handleCopyDetails}>
                      Copy Details
                    </button>
                  </div>
                  <div className="qr-code">
                    <img src="/images/qr-code.png" alt="QR Code for Payment" />
                    <p>Scan to pay with any bank app</p>
                  </div>
                </motion.div>
              )}

              {paymentMethod === 'ussd' && (
                <motion.div
                  className="ussd-details"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4>USSD Payment</h4>
                  <p>Dial the following code on your phone:</p>
                  <div className="ussd-code">*894*2023456789*{amount || 'AMOUNT'}#</div>
                  <p className="ussd-note">Follow the prompts to complete your payment</p>
                </motion.div>
              )}

              {paymentMethod === 'crypto' && (
                <motion.div
                  className="crypto-details"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4>Crypto Donations</h4>
                  <p>Send cryptocurrency to the following addresses:</p>
                  <div className="crypto-address">
                    <strong>Bitcoin (BTC):</strong>
                    <code>bc1qxrqat06ul4y7f974ywy7m467rfzh6as87x0wlh</code>
                  </div>
                  <div className="crypto-address">
                    <strong>Ethereum (ETH):</strong>
                    <code>0x742922b5a8b13326181f26e8d8f900b47597b0a0</code>
                  </div>
                  <div className="crypto-address">
                    <strong>USDT (TRC20):</strong>
                    <code>TSw3kk2GCyUUsGnvR2ZHSNoEaWkhfkGE1J</code>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Give;