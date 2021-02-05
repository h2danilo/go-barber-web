import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import {
  Container,
  Badge,
  NotificationList,
  Scroll,
  Notification,
} from './styles';

function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const token = useSelector((state) => state.auth.token);

  const hasUnread = useMemo(
    // usando forma baixa ira retornar true ou false;
    // !! = Boolean(notifications.find(notification => notification.read === false))
    () => !!notifications.find((notification) => notification.read === false),
    [notifications]
  );

  // carregando notificacoes do usuario
  useEffect(() => {
    async function loadNotifications() {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      const response = await api.get('notifications');

      const data = response.data.map((notification) => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          { addSuffix: true, locale: pt }
        ),
      }));

      setNotifications(data);
    }

    loadNotifications();
  }, [token]);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleMarkAsRead(id) {
    await api.put(`notifications/${id}`);

    setNotifications(
      notifications.map((notification) =>
        notification._id === id ? { ...notification, read: true } : notification
      )
    );
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
        <MdNotifications color="#5bb12f" size={20} />
      </Badge>
      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map((notification) => (
            <Notification unread={!notification.read}>
              <p>{notification.content}</p>
              <time>{notification.timeDistance}</time>
              {!Notification.read && (
                <button
                  type="button"
                  onClick={() => handleMarkAsRead(notification._id)}
                >
                  Marcar como lida
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}

export default Notifications;
