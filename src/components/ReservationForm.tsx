import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

interface ReservationFormProps {
  onReserve: (data: { fullName: string; email: string; phone: string }) => void;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({ onReserve }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: { fullName?: string; email?: string; phone?: string } = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Full name required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = 'Valid email required';
    }
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    if (!cleanPhone || cleanPhone.length < 7) {
      newErrors.phone = 'Valid phone required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onReserve({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
      });
      setIsSubmitting(false);
      setFullName('');
      setEmail('');
      setPhone('');
    }, 450);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Container with ultra-thin tinted stroke border, NO shadow box */}
      <div className="bg-white/95 backdrop-blur-md border border-slate-300/80 rounded-sm p-6 sm:p-7 transition-colors">
        {/* Bold Header "Register" replacing the date and live seats */}
        <div className="pb-4 mb-5 border-b border-slate-200">
          <h2 className="font-century-bold text-2xl sm:text-3xl tracking-tight text-slate-900">
            Register
          </h2>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Field */}
          <div>
            <label className="block text-xs font-century-bold text-slate-800 mb-1.5">
              FULL NAME
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) setErrors({ ...errors, fullName: undefined });
              }}
              placeholder="e.g. Sterling Hayes"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50/80 border border-slate-300 rounded-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-colors"
            />
            {errors.fullName && (
              <p className="text-[11px] text-rose-600 font-century mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email Field with label EMAIL and gmail placeholder */}
          <div>
            <label className="block text-xs font-century-bold text-slate-800 mb-1.5">
              EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              placeholder="e.g. sterlinghayes@gmail.com"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50/80 border border-slate-300 rounded-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-colors"
            />
            {errors.email && (
              <p className="text-[11px] text-rose-600 font-century mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Number Field */}
          <div>
            <label className="block text-xs font-century-bold text-slate-800 mb-1.5">
              PHONE NUMBER
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors({ ...errors, phone: undefined });
              }}
              placeholder="+1 (612) 000-0000"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50/80 border border-slate-300 rounded-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-colors"
            />
            {errors.phone && (
              <p className="text-[11px] text-rose-600 font-century mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Submit Action: Single-word label 'Reserve' */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold uppercase tracking-widest text-white bg-slate-900 hover:bg-slate-800 rounded-sm transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Reserving</span>
                </>
              ) : (
                <>
                  <span>Reserve</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Domain & Event Path Attribution */}
          <div className="pt-2 text-center">
            <span className="text-[11px] font-century text-slate-400 tracking-wide">
              visionaryleadershipdevelopment.com/minnesota-event
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
