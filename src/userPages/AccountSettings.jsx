import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Lock, Bell, CreditCard, Shield, Key, Trash2, Eye, EyeOff } from 'lucide-react';
import { cn } from "@/lib/utils";

const AccountSettings = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const notificationSettings = [
    { id: 'booking-confirm', label: 'Booking confirmations', checked: true },
    { id: 'pickup-reminders', label: 'Pickup reminders', checked: true },
    { id: 'promotional', label: 'Promotional offers', checked: false },
    { id: 'newsletter', label: 'Monthly newsletter', checked: true }
  ];

  const privacySettings = [
    { id: 'profile-visible', label: 'Show my profile to other users', checked: false },
    { id: 'location-tracking', label: 'Allow location tracking', checked: true },
    { id: 'data-sharing', label: 'Share data with recycling partners', checked: true }
  ];

  const paymentMethods = [
    { id: 'visa', type: 'VISA', number: '**** **** **** 1234', expires: '12/2026' },
    { id: 'paypal', type: 'PayPal', email: 'amit@example.com' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className={cn(
      "bg-white p-6 rounded-xl shadow-lg",
      "border border-gray-200 dark:border-gray-700",
      "dark:bg-gray-800"
    )}>
      <h2 className={cn(
        "text-2xl font-bold mb-6 pb-3",
        "border-b border-gray-200 dark:border-gray-700",
        "flex items-center gap-3 text-gray-800 dark:text-white"
      )}>
        <Key className="text-purple-500" size={24} />
        Account Settings
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Security & Privacy */}
        <div className="space-y-8">
          {/* Password & Security */}
          <div>
            <h3 className={cn(
              "text-lg font-semibold mb-4 pb-2",
              "border-b border-gray-200 dark:border-gray-700",
              "flex items-center gap-2 text-gray-700 dark:text-gray-300"
            )}>
              <Lock size={20} /> Password & Security
            </h3>
            
            <form className="space-y-4">
              {[
                {
                  name: 'currentPassword',
                  placeholder: 'Current Password',
                  value: passwordData.currentPassword,
                  show: showPasswords.current,
                  icon: Lock,
                  fieldKey: 'current'
                },
                {
                  name: 'newPassword',
                  placeholder: 'New Password',
                  value: passwordData.newPassword,
                  show: showPasswords.new,
                  icon: Key,
                  fieldKey: 'new'
                },
                {
                  name: 'confirmPassword',
                  placeholder: 'Confirm New Password',
                  value: passwordData.confirmPassword,
                  show: showPasswords.confirm,
                  icon: Lock,
                  fieldKey: 'confirm'
                }
              ].map((field, index) => (
                <div key={index} className={cn(
                  "flex items-center gap-3 p-3 rounded-lg",
                  "border border-gray-300 dark:border-gray-600",
                  "bg-gray-50 dark:bg-gray-700",
                  "hover:bg-white dark:hover:bg-gray-600 transition-colors"
                )}>
                  <field.icon className="text-gray-500 dark:text-gray-400 flex-shrink-0" size={20} />
                  <input 
                    type={field.show ? "text" : "password"} 
                    name={field.name}
                    placeholder={field.placeholder} 
                    value={field.value}
                    onChange={handleChange}
                    className={cn(
                      "flex-1 bg-transparent outline-none",
                      "text-gray-700 dark:text-gray-200"
                    )}
                  />
                  <button 
                    type="button" 
                    onClick={() => togglePasswordVisibility(field.fieldKey)}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {field.show ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              ))}
              
              <div className="flex justify-end mt-2">
                <Button className={cn(
                  "bg-blue-600 hover:bg-blue-700",
                  "px-5 py-2.5 text-base font-medium"
                )}>
                  Update Password
                </Button>
              </div>
            </form>
          </div>
          
          {/* Privacy Settings */}
          <div>
            <h3 className={cn(
              "text-lg font-semibold mb-4 pb-2",
              "border-b border-gray-200 dark:border-gray-700",
              "flex items-center gap-2 text-gray-700 dark:text-gray-300"
            )}>
              <Shield size={20} /> Privacy Settings
            </h3>
            
            <div className="space-y-3">
              {privacySettings.map((setting) => (
                <div key={setting.id} className={cn(
                  "flex items-center justify-between p-4 rounded-lg",
                  "border border-gray-300 dark:border-gray-600",
                  "bg-gray-50 dark:bg-gray-700",
                  "hover:bg-white dark:hover:bg-gray-600 transition-colors"
                )}>
                  <span className="text-gray-700 dark:text-gray-300">{setting.label}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      defaultChecked={setting.checked}
                    />
                    <div className={cn(
                      "w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full",
                      "peer peer-checked:after:translate-x-6 peer-checked:after:border-white",
                      "after:content-[''] after:absolute after:top-0.5 after:left-[2px]",
                      "after:bg-white after:border-gray-300 after:border",
                      "after:rounded-full after:h-5 after:w-5 after:transition-all",
                      "peer-checked:bg-green-500 dark:peer-checked:bg-green-600",
                      "dark:bg-gray-600"
                    )}></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column - Notifications, Payments & Actions */}
        <div className="space-y-8">
          {/* Notification Preferences */}
          <div>
            <h3 className={cn(
              "text-lg font-semibold mb-4 pb-2",
              "border-b border-gray-200 dark:border-gray-700",
              "flex items-center gap-2 text-gray-700 dark:text-gray-300"
            )}>
              <Bell size={20} /> Notification Preferences
            </h3>
            
            <div className="space-y-3">
              {notificationSettings.map((setting) => (
                <div key={setting.id} className={cn(
                  "flex items-center justify-between p-4 rounded-lg",
                  "border border-gray-300 dark:border-gray-600",
                  "bg-gray-50 dark:bg-gray-700",
                  "hover:bg-white dark:hover:bg-gray-600 transition-colors"
                )}>
                  <span className="text-gray-700 dark:text-gray-300">{setting.label}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      defaultChecked={setting.checked}
                    />
                    <div className={cn(
                      "w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full",
                      "peer peer-checked:after:translate-x-6 peer-checked:after:border-white",
                      "after:content-[''] after:absolute after:top-0.5 after:left-[2px]",
                      "after:bg-white after:border-gray-300 after:border",
                      "after:rounded-full after:h-5 after:w-5 after:transition-all",
                      "peer-checked:bg-blue-500 dark:peer-checked:bg-blue-600",
                      "dark:bg-gray-600"
                    )}></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Payment Methods */}
          <div>
            <h3 className={cn(
              "text-lg font-semibold mb-4 pb-2",
              "border-b border-gray-200 dark:border-gray-700",
              "flex items-center gap-2 text-gray-700 dark:text-gray-300 dark:tex"
            )}>
              <CreditCard size={20} /> Payment Methods
            </h3>
            
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className={cn(
                  "p-4 rounded-lg border",
                  "border-gray-300 dark:border-gray-600",
                  "bg-white dark:bg-gray-700",
                  "flex justify-between items-center"
                )}>
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-8 rounded-md flex items-center justify-center",
                      method.type === 'VISA' 
                        ? "bg-blue-600" 
                        : "bg-blue-500"
                    )}>
                      <span className="text-white text-xs font-bold">
                        {method.type}
                      </span>
                    </div>
                    <div>
                      {method.number ? (
                        <>
                          <p className="font-medium text-gray-700 dark:text-gray-300">
                            {method.number}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Expires {method.expires}
                          </p>
                        </>
                      ) : (
                        <p className="font-medium text-gray-700 dark:text-gray-300">
                          {method.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className={cn(
                "w-full py-3 border-2 border-dashed",
                "border-gray-300 dark:border-gray-600",
                "text-gray-600 dark:text-gray-400",
                "hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-800",
                "flex items-center justify-center gap-2"
              )}>
                <span>+</span>
                Add Payment Method
              </Button>
            </div>
          </div>
          
          {/* Account Actions */}
          <div>
            <h3 className={cn(
              "text-lg font-semibold mb-4 pb-2",
              "border-b border-gray-200 dark:border-gray-700",
              "text-gray-700 dark:text-gray-300 hover:text-gray-800"
            )}>
              Account Actions
            </h3>
            
            <div className="space-y-3">
              <Button variant="outline" className={cn(
                "w-full py-3.5 justify-start",
                "text-red-600 dark:text-red-500",
                "border-red-300 dark:border-red-800",
                "hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-gray-800",
                "transition-colors"
              )}>
                <Trash2 size={18} className="mr-3" />
                Deactivate Account
              </Button>
              
              <Button variant="outline" className={cn(
                "w-full py-3.5 justify-start",
                "text-red-600 ",
                "border-red-300",
                "hover:bg-red-500 hover:text-gray-800",
                "transition-colors"
              )}>
                <Trash2 size={18} className="mr-3" />
                Delete Account Permanently
              </Button>
              
              <div className={cn(
                "mt-4 p-4 rounded-lg",
                "bg-yellow-50 border border-yellow-200",
                "dark:bg-yellow-900/20 dark:border-yellow-800",
                "text-yellow-700 dark:text-yellow-300"
              )}>
                <p className="text-sm font-medium">
                  Warning: Deleting your account is permanent and cannot be undone. 
                  All your data will be permanently removed from our systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;