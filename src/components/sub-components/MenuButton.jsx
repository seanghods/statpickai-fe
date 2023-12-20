import { useNavigate } from 'react-router-dom';
import useResponse from '../../context/useResponse';
import { DropdownMenu, Button } from '@radix-ui/themes';
import { CaretDownIcon } from '@radix-ui/react-icons';

export default function MenuButtonX({ handleLogOut }) {
  const navigate = useNavigate();
  const { user, setShowLogInModal } = useResponse();

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          style={{ color: 'rgb(209, 213, 219)', padding: 0 }}
          className="text-gray-300"
        >
          <Button variant="soft">
            Menu
            <CaretDownIcon />
          </Button>
        </DropdownMenu.Trigger>
        {user.username ? (
          <DropdownMenu.Content>
            <DropdownMenu.Item onClick={() => navigate('/all-responses')}>
              Responses
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => navigate('/profile')}>
              Profile
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => navigate('/')}>
              Home
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item
              style={{ width: '90px' }}
              color="red"
              onClick={handleLogOut}
            >
              Log Out
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        ) : (
          <DropdownMenu.Content>
            <DropdownMenu.Item onClick={() => navigate('/pricing')}>
              Pricing
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => navigate('/about')}>
              About
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item
              style={{ width: '90px' }}
              color="purple"
              onClick={() => setShowLogInModal(true)}
            >
              Log In
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        )}
      </DropdownMenu.Root>
    </>
  );
}
