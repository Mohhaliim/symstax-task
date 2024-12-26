import styled from 'styled-components';
import { LogoutRounded } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import {firebaseSignOut} from '@/firebase/AuthService';

const NavbarWrapper = styled.div`
  background-color: #fff;
  padding-inline: 20px;
  padding-block: 10px;
  border-radius: 5px;
  box-shadow: 0 1px 10px -1px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLogo = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const Navbar = () => {

    const handleLogout = async () => {
        await firebaseSignOut();
    }

    return (
        <NavbarWrapper>
            <NavLogo>Symstax</NavLogo>
                <Tooltip title="Logout">
                    <IconButton
                        onClick={handleLogout}
                        size="large"
                        color="error"
                        aria-label="logout"
                    >
                        <LogoutRounded />
                    </IconButton>
                </Tooltip>
        </NavbarWrapper>
    )
}

export default Navbar