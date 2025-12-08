import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { User, Mail, Save, Check, AlertCircle } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email || '');
        setDisplayName(user.user_metadata?.display_name || user.user_metadata?.full_name || '');
      }
    };
    loadUserData();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.updateUser({
        email: email,
        data: { display_name: displayName }
      });

      if (error) throw error;

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-12 max-w-2xl mx-auto">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="text-gray-400">Manage your account settings</p>
      </header>

      <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-6">Profile Information</h3>

        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            message.type === 'success' 
              ? 'bg-green-500/10 border border-green-500/30 text-green-400' 
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}>
            {message.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
            <span>{message.text}</span>
          </div>
        )}

        <div className="space-y-6">
          {/* Display Name */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Display Name <span className="text-gray-500">(max 12 characters)</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                maxLength={12}
                placeholder="Enter your display name"
                className={`w-full bg-gray-800 border rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none transition-colors ${
                  displayName.length > 12 ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-primary-500'
                }`}
              />
            </div>
            <div className="flex justify-between mt-1">
              {displayName.length > 12 && (
                <span className="text-red-400 text-xs">Display name must be 12 characters or less</span>
              )}
              <span className={`text-xs ml-auto ${displayName.length > 12 ? 'text-red-400' : 'text-gray-500'}`}>
                {displayName.length}/12
              </span>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 disabled:bg-primary-600/50 text-white py-3 px-4 rounded-lg font-medium transition-colors"
          >
            <Save size={20} />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};
