import React, { useState, useEffect } from 'react';
import { X, Mail, User, Phone, Briefcase, HelpCircle, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import emailjs from '@emailjs/browser';

export default function ContactModal({ isOpen, onClose, initialPurpose = 'Hire Me' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    purpose: initialPurpose,
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle, submitting, success, partial, error
  const [errorMessage, setErrorMessage] = useState('');

  // Update purpose if initialPurpose prop changes when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({ ...prev, purpose: initialPurpose }));
      setStatus('idle');
      setErrors({});
      setErrorMessage('');
    }
  }, [isOpen, initialPurpose]);

  if (!isOpen) return null;

  // Rate Limiting Check (Spam Prevention)
  // Max 3 submissions per 10 minutes from the same device
  const checkRateLimit = () => {
    const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
    const now = Date.now();
    
    const recentSubmissions = submissions.filter(time => now - time < 10 * 60 * 1000);
    
    if (recentSubmissions.length >= 3) {
      return false;
    }
    
    recentSubmissions.push(now);
    localStorage.setItem('contact_submissions', JSON.stringify(recentSubmissions));
    return true;
  };

  const sanitizeInput = (val) => {
    if (typeof val !== 'string') return '';
    return val.trim();
  };

  const validate = () => {
    const tempErrors = {};
    const htmlInjectionRegex = /<[^>]*>|javascript:|on\w*\s*=/i;

    // 1. Full Name
    const nameTrimmed = formData.fullName.trim();
    if (!nameTrimmed) {
      tempErrors.fullName = 'Full Name is required';
    } else if (nameTrimmed.length > 100) {
      tempErrors.fullName = 'Full Name must be under 100 characters';
    } else if (htmlInjectionRegex.test(nameTrimmed)) {
      tempErrors.fullName = 'Invalid characters or HTML injection detected';
    }

    // 2. Email Address
    const emailTrimmed = formData.email.trim().toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailTrimmed) {
      tempErrors.email = 'Email Address is required';
    } else if (emailTrimmed.length > 254) {
      tempErrors.email = 'Email Address must be under 254 characters';
    } else if (!emailRegex.test(emailTrimmed)) {
      tempErrors.email = 'Please enter a valid email address';
    } else if (htmlInjectionRegex.test(emailTrimmed)) {
      tempErrors.email = 'Invalid email structure detected';
    }

    // 3. Phone Number (Optional)
    const phoneTrimmed = formData.phone.trim();
    if (phoneTrimmed) {
      const phoneRegex = /^[+]?[0-9\s()+-]{5,25}$/;
      if (!phoneRegex.test(phoneTrimmed)) {
        tempErrors.phone = 'Please enter a valid phone number';
      } else if (htmlInjectionRegex.test(phoneTrimmed)) {
        tempErrors.phone = 'Invalid phone character sequence detected';
      }
    }

    // 4. Company (Optional)
    const companyTrimmed = formData.company.trim();
    if (companyTrimmed) {
      if (companyTrimmed.length > 100) {
        tempErrors.company = 'Company name must be under 100 characters';
      } else if (htmlInjectionRegex.test(companyTrimmed)) {
        tempErrors.company = 'Invalid characters or HTML injection detected';
      }
    }

    // 5. Message Inquiry
    const messageTrimmed = formData.message.trim();
    if (!messageTrimmed) {
      tempErrors.message = 'Message is required';
    } else if (messageTrimmed.length > 3000) {
      tempErrors.message = 'Message must be under 3000 characters';
    } else if (htmlInjectionRegex.test(messageTrimmed)) {
      tempErrors.message = 'HTML tags or script injections are not allowed in messages';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    if (!checkRateLimit()) {
      setStatus('error');
      setErrorMessage('Rate limit exceeded. You can only send 3 inquiries every 10 minutes. Please try again later.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const sanitizedData = {
        full_name: sanitizeInput(formData.fullName),
        email: sanitizeInput(formData.email),
        phone: sanitizeInput(formData.phone),
        company: sanitizeInput(formData.company),
        purpose: formData.purpose,
        message: sanitizeInput(formData.message),
      };

      // 1. Save to Supabase contact_leads
      const { error } = await supabase
        .from('contact_leads')
        .insert([sanitizedData]);

      if (error) {
        console.error('Supabase Error:', error);
        throw new Error('Failed to save message to database.');
      }

      // 2. Send Emails using EmailJS
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const adminTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ADMIN;
      const visitorTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_VISITOR;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      const formattedTimestamp = new Date().toLocaleString('en-US', {
        timeZoneName: 'short',
      });

      const emailParams = {
        name: sanitizedData.full_name,
        email: sanitizedData.email,
        phone: sanitizedData.phone || 'N/A',
        company: sanitizedData.company || 'N/A',
        purpose: sanitizedData.purpose,
        message: sanitizedData.message,
        timestamp: formattedTimestamp,
      };

      const notificationFailures = [];

      // Send to Admin if credentials exist
      if (serviceId && adminTemplateId && publicKey) {
        try {
          await emailjs.send(serviceId, adminTemplateId, emailParams, publicKey);
        } catch (emailErr) {
          notificationFailures.push('admin');
          console.error('EmailJS admin notification failed:', emailErr?.message || 'unknown error');
        }
      } else {
        notificationFailures.push('admin');
      }

      // Send Auto-reply to Visitor if credentials exist
      if (serviceId && visitorTemplateId && publicKey) {
        try {
          await emailjs.send(serviceId, visitorTemplateId, emailParams, publicKey);
        } catch (emailErr) {
          notificationFailures.push('visitor');
          console.error('EmailJS visitor auto-reply failed:', emailErr?.message || 'unknown error');
        }
      } else {
        notificationFailures.push('visitor');
      }

      setStatus(notificationFailures.length > 0 ? 'partial' : 'success');
      if (notificationFailures.length > 0) {
        setErrorMessage(
          'Your message was recorded successfully in our database! However, email delivery could not be completed at this moment. You can also reach out directly via WhatsApp.'
        );
      }
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        purpose: 'Hire Me',
        message: '',
      });
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again or reach out on WhatsApp.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl glass-panel bg-[#171717] border border-white/10 shadow-2xl animate-scale-in my-8 text-left"
        role="dialog" 
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        {/* Glow */}
        <div className="glow-orange -top-24 -left-24 pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white transition-colors rounded-full bg-white/5 hover:bg-white/10 z-15 border border-white/5 cursor-pointer"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {status === 'success' || status === 'partial' ? (
          /* SUCCESS / PARTIAL SCREEN */
          <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[420px]">
            <div className="w-16 h-16 bg-[#FF5A1F]/20 border border-[#FF5A1F]/40 rounded-2xl flex items-center justify-center mb-5 text-[#FF7A18]">
              <CheckCircle2 size={32} />
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 font-display">
              {status === 'partial' ? 'Inquiry Recorded' : 'Message Sent Successfully!'}
            </h3>
            
            <p className="text-slate-300 max-w-md mx-auto mb-6 text-xs sm:text-sm leading-relaxed">
              {status === 'partial'
                ? errorMessage
                : "Thank you for reaching out! I've received your request and will get back to you within 24 hours."}
            </p>
            
            <button
              onClick={onClose}
              className="px-7 py-2.5 bg-gradient-to-r from-[#FF5A1F] to-[#D9361E] hover:from-[#FF7A18] hover:to-[#D9361E] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-[#FF5A1F]/20 transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          /* FORM SCREEN */
          <div className="p-6 sm:p-9 relative z-10">
            <div className="mb-6">
              <span className="text-[10px] font-bold text-[#FF7A18] uppercase tracking-widest px-2.5 py-0.5 bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 rounded-full inline-block mb-2">
                LET'S CONNECT
              </span>
              <h2 id="contact-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                Start a Conversation
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 font-light">
                Fill out the form below and I'll respond within 24 hours.
              </p>
            </div>

            {status === 'error' && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-[#FF5A1F]">*</span>
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-3.5 text-slate-500" />
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111111] border text-xs sm:text-sm text-white placeholder-slate-500 transition focus:outline-none focus:border-[#FF5A1F] ${
                        errors.fullName ? 'border-rose-500/60' : 'border-white/10'
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-rose-400 text-[11px] mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-[#FF5A1F]">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-3.5 text-slate-500" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@domain.com"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111111] border text-xs sm:text-sm text-white placeholder-slate-500 transition focus:outline-none focus:border-[#FF5A1F] ${
                        errors.email ? 'border-rose-500/60' : 'border-white/10'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-rose-400 text-[11px] mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Phone Number <span className="text-slate-500 text-[10px]">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3.5 top-3.5 text-slate-500" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111111] border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 transition focus:outline-none focus:border-[#FF5A1F]"
                    />
                  </div>
                </div>

                {/* Company / Org */}
                <div>
                  <label htmlFor="company" className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Company / Organization <span className="text-slate-500 text-[10px]">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Briefcase size={15} className="absolute left-3.5 top-3.5 text-slate-500" />
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Startup / Organization"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111111] border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 transition focus:outline-none focus:border-[#FF5A1F]"
                    />
                  </div>
                </div>
              </div>

              {/* Purpose Dropdown */}
              <div>
                <label htmlFor="purpose" className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Purpose of Contact <span className="text-[#FF5A1F]">*</span>
                </label>
                <div className="relative">
                  <HelpCircle size={15} className="absolute left-3.5 top-3.5 text-slate-500" />
                  <select
                    id="purpose"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#111111] border border-white/10 text-xs sm:text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-[#FF5A1F]"
                  >
                    <option value="Hire Me">Hire Me (Full-Time / Roles)</option>
                    <option value="Web Development">Web Development</option>
                    <option value="UI/UX & Figma Design">UI/UX & Figma Design</option>
                    <option value="Event Management">Event Management</option>
                    <option value="Social Media Strategy">Social Media Strategy</option>
                    <option value="Content & Reels Script Writing">Content & Reels Script Writing</option>
                    <option value="Creative Design & Branding">Creative Design & Branding</option>
                    <option value="Photography & Videography">Photography & Videography</option>
                    <option value="Product Strategy & Consulting">Product Strategy & Consulting</option>
                    <option value="Event Collaboration">Event Collaboration</option>
                    <option value="Speaking Opportunity">Speaking Opportunity</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Message <span className="text-[#FF5A1F]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell me about your project, timeline, or what you'd like to collaborate on..."
                  className={`w-full px-4 py-3 rounded-xl bg-[#111111] border text-xs sm:text-sm text-white placeholder-slate-500 transition focus:outline-none focus:border-[#FF5A1F] ${
                    errors.message ? 'border-rose-500/60' : 'border-white/10'
                  }`}
                ></textarea>
                {errors.message && (
                  <p className="text-rose-400 text-[11px] mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-[#FF5A1F] to-[#D9361E] hover:from-[#FF7A18] hover:to-[#D9361E] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-lg shadow-[#FF5A1F]/20 cursor-pointer"
              >
                {status === 'submitting' ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
