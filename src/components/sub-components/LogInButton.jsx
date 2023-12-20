import toast from 'react-hot-toast';
import { useState } from 'react';
import { API_ROUTES } from '../../utils/constants';
import useResponse from '../../context/useResponse';
import { Dialog, Flex, Text, TextField, Button } from '@radix-ui/themes';

export default function LogInButton() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useResponse();
  const [formErrors, setFormErrors] = useState({
    username: '',
    password: '',
    message: '',
  });
  async function handleLogIn(e) {
    e.preventDefault();
    const response = await fetch(API_ROUTES.logIn, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      credentials: 'include',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();

    if (response.ok && data.success) {
      setUser(data.user);
      toast.success('Successfully logged in.');
    } else {
      const newErrors = {
        username: '',
        password: '',
        message: 'Incorrect Username / Password',
      };
      setFormErrors(newErrors);
    }
  }
  return (
    <Dialog.Root
      onOpenChange={() =>
        setFormErrors({
          username: '',
          password: '',
          message: '',
        })
      }
    >
      <Dialog.Trigger>
        <button
          onClick={e => e.stopPropagation()}
          className="transform transition duration-250 text-gray-300 hover:text-gray-400 text-sm md:text-base"
        >
          Log In
        </button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Log In</Dialog.Title>
        <Dialog.Description size="2" mb="4"></Dialog.Description>
        <form onSubmit={handleLogIn}>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Username / Email
              </Text>
              <TextField.Input
                name="username"
                type="text"
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter your username or email"
              />
            </label>
            {formErrors.username}
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Password
              </Text>
              <TextField.Input
                name="password"
                type="password"
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </label>
            {formErrors.password}
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={e => handleLogIn(e)}>Log In</Button>
            </Dialog.Close>
          </Flex>
          <Text className="italic">{formErrors.message}</Text>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
