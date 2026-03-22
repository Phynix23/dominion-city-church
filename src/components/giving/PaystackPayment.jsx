import React, { useState } from 'react';
import { PaystackButton } from 'react-paystack';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import emailService from '../../utils/emailService';

const PaystackPayment = () => {
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [purpose, setPurpose] = useState('tithe');
  const [isProcessing, setIsProcessing] = useState(false);

  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;

  const handleSuccess = async (reference) => {
    setIsProcessing(false);
    
    // Send email receipt
    await emailService.sendDonationReceipt({
      name,
      email,
      amount,
      purpose,
      reference: reference.reference,
      date: new Date().toLocaleString()
    });
    
    toast.success(`Thank you for your donation of ₦${amount}! Check your email for receipt.`);
    
    // Reset form
    setAmount('');
    setEmail('');
    setName('');
    setPurpose('tithe');
  };

  const handleClose = () => {
    setIsProcessing(false);
    toast.info('Payment cancelled');
  };

  const componentProps = {
    email,
    amount: amount * 100,
    metadata: {
      name,
      purpose,
      custom_fields: [
        {
          display_name: "Purpose",
          variable_name: "purpose",
          value: purpose
        }
      ]
    },
    publicKey,
    text: isProcessing ? 'Processing...' : `Pay ₦${amount || 0}`,
    onSuccess: handleSuccess,
    onClose: handleClose,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !email || !name) {
      toast.error('Please fill in all fields');
      return;
    }
    setIsProcessing(true);
  };

  return (
    <div className="paystack-payment">
      <motion.form
        onSubmit={handleSubmit}
        className="payment-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3>Quick Give</h3>
        
        <div className="amount-presets">
          {[5000, 10000, 20000, 50000, 100000].map(preset => (
            <button
              key={preset}
              type="button"
              className="preset-btn"
              onClick={() => setAmount(preset)}
            >
              ₦{preset.toLocaleString()}
            </button>
          ))}
        </div>

        <div className="form-group">
          <input
            type="number"
            placeholder="Custom Amount (₦)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <select value={purpose} onChange={(e) => setPurpose(e.target.value)}>
            <option value="tithe">Tithe</option>
            <option value="offering">Offering</option>
            <option value="seed">Seed</option>
            <option value="building">Building Project</option>
            <option value="missions">Missions</option>
            <option value="benevolence">Benevolence</option>
          </select>
        </div>

        {amount && email && name ? (
          <PaystackButton {...componentProps} className="btn btn-primary btn-block" />
        ) : (
          <button type="submit" className="btn btn-primary btn-block">
            Proceed to Pay
          </button>
        )}
      </motion.form>

      <style jsx>{`
        .paystack-payment {
          max-width: 500px;
          margin: 0 auto;
        }
        
        .payment-form {
          background: rgba(255,255,255,0.05);
          padding: 40px;
          border-radius: 20px;
        }
        
        .amount-presets {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        
        .preset-btn {
          background: transparent;
          border: 1px solid var(--primary-blue);
          color: var(--text-light);
          padding: 10px 20px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .preset-btn:hover {
          background: var(--primary-blue);
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-group input,
        .form-group select {
          width: 100%;
          padding: 14px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(65,105,225,0.3);
          border-radius: 10px;
          color: var(--text-light);
        }
        
        .btn-block {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default PaystackPayment;