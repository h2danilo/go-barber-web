import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo_50.svg';

import Notifications from '~/components/Notifications';

import { Container, Content, Profile } from './styles';

function Header() {
  const profile = useSelector((state) => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="goBarber" />
          <Link to="/dashboard">HOME</Link>
        </nav>

        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
          </Profile>
          <img
            src={
              profile.avatar.url ||
              'https://avatars.dicebear.com/4.5/api/bottts/danilovalim.svg?w=50&h=50'
            }
            alt="Danilo valim"
          />
        </aside>
      </Content>
    </Container>
  );
}

export default Header;
