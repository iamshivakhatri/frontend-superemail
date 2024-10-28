"use client";
import React, { useState } from 'react';

interface ProfileSettings {
  username: string;
  email: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
}

interface SecuritySettings {
  password: string;
  twoFactorAuth: boolean;
}

const SettingsPage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileSettings>({
    username: '',
    email: '',
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: false,
  });

  const [security, setSecurity] = useState<SecuritySettings>({
    password: '',
    twoFactorAuth: false,
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotifications((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSecurity((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile:', profile);
    console.log('Notifications:', notifications);
    console.log('Security:', security);
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
        <section className="settings-section">
          <h2>Profile</h2>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleProfileChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
            />
          </label>
        </section>

        <section className="settings-section">
          <h2>Notifications</h2>
          <label>
            Email Notifications:
            <input
              type="checkbox"
              name="emailNotifications"
              checked={notifications.emailNotifications}
              onChange={handleNotificationChange}
            />
          </label>
          <label>
            Push Notifications:
            <input
              type="checkbox"
              name="pushNotifications"
              checked={notifications.pushNotifications}
              onChange={handleNotificationChange}
            />
          </label>
        </section>

        <section className="settings-section">
          <h2>Security</h2>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={security.password}
              onChange={handleSecurityChange}
            />
          </label>
          <label>
            Two-Factor Authentication:
            <input
              type="checkbox"
              name="twoFactorAuth"
              checked={security.twoFactorAuth}
              onChange={handleSecurityChange}
            />
          </label>
        </section>

        <button className="submit-btn" type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default SettingsPage;
