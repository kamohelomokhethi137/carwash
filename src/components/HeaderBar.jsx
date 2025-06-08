import React, { useState } from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import Notifications from './pages/Notifications';

function HeaderBar() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setShowNotifications(!showNotifications)}>
        <IoMdNotificationsOutline size={24} className="text-gray-800" />
      </button>

      {showNotifications && (
        <Notifications onClose={() => setShowNotifications(false)} />
      )}
    </div>
  );
}

export default HeaderBar;
