import { useState } from 'react';
import { API_ROUTES } from '../../utils/constants';
import useResponse from '../../context/useResponse';
import { Dialog, Flex, Text, TextField, Button } from '@radix-ui/themes';
import { capitalize } from '../../utils/helpers';

export default function ShareModal({ response }) {
  const [title, setTitle] = useState('');
  const [resetMsg, setResetMsg] = useState('');
  const { setUser } = useResponse();
  const [errors, setErrors] = useState('');
  async function handleShare(e) {
    e.preventDefault();
    const response = await fetch(API_ROUTES.logIn, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      credentials: 'include',
      body: JSON.stringify({
        title: title,
      }),
    });
    const data = await response.json();

    if (response.ok && data.success) {
      //
    } else {
      setErrors('Error');
    }
  }
  return (
    <Dialog.Root
      onOpenChange={() => {
        setErrors('');
        setResetMsg('');
      }}
    >
      <Dialog.Trigger>
        <Button
          onClick={e => e.stopPropagation()}
          className="transform transition duration-250 text-gray-300 hover:text-gray-400 text-sm md:text-base"
        >
          Share to Community
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Share to Community</Dialog.Title>
        <Dialog.Description size="2" mb="4"></Dialog.Description>
        <form onSubmit={handleShare}>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Title*
              </Text>
              <TextField.Input
                name="title"
                type="text"
                onClick={e => e.stopPropagation()}
                onChange={e => setTitle(e.target.value)}
                placeholder="Title..."
              />
            </label>
          </Flex>
          <div className="w-full px-4 py-2 gap-4 text-sm my-1 flex flex-col">
            <div>Player: {response.player}</div>
            <div>Stat: {response.stat ? capitalize(response.stat) : null}</div>
            <div>Line: {response.line}</div>
          </div>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={e => handleShare(e)}>Share</Button>
            </Dialog.Close>
          </Flex>
          <Text className="italic text-red-300">{errors}</Text>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
