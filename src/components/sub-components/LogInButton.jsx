import toast from 'react-hot-toast';
import { useState } from 'react';
import { API_ROUTES } from '../../utils/constants';
import useResponse from '../../context/useResponse';
import { Dialog, Flex, Text, TextField, Button } from '@radix-ui/themes';

export default function LogInButton() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [resetPass, setResetPass] = useState(false);
  const [email, setEmail] = useState('');
  const [resetMsg, setResetMsg] = useState('');
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
  async function handleReset(e) {
    e.preventDefault();
    const response = await fetch(API_ROUTES.forgotPassword, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await response.json();
    if (data.success) {
      setResetMsg('success');
    } else {
      setResetMsg('error');
    }
  }
  return (
    <Dialog.Root
      onOpenChange={() => {
        setFormErrors({
          username: '',
          password: '',
          message: '',
        });
        setResetMsg('');
        setResetPass(false);
      }}
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
        <Dialog.Title>{resetPass ? 'Reset Password' : 'Log In'}</Dialog.Title>
        <Dialog.Description size="2" mb="4"></Dialog.Description>
        {resetPass ? (
          <>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Email
              </Text>
              <TextField.Input
                name="email"
                type="email"
                onClick={e => e.stopPropagation()}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email to receive a reset link"
              />
            </label>
            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button onClick={e => handleReset(e)}>Reset Password</Button>
              </Dialog.Close>
            </Flex>
            <div className="text-sm my-2">
              {resetMsg == 'success' &&
                'Submitted. If you have an account with your submitted email, expect a reset password link shortly.'}
              {resetMsg == 'error' &&
                'There was an error requesting your forgotten password. The developer has been notified. Please try again later.'}
            </div>
          </>
        ) : (
          <form onSubmit={handleLogIn}>
            <Flex direction="column" gap="3">
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Username / Email
                </Text>
                <TextField.Input
                  name="username"
                  type="text"
                  onClick={e => e.stopPropagation()}
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
                  onClick={e => e.stopPropagation()}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </label>
              {formErrors.password}
            </Flex>
            <div className="w-full text-right text-xs my-1">
              <div
                onClick={() => setResetPass(true)}
                className="cursor-pointer text-gray-300 hover:text-white"
              >
                Forgot Password?
              </div>
            </div>
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
            <Text className="italic text-red-300">{formErrors.message}</Text>
          </form>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
}
