import { Message } from '@/models/Message';
import { User } from '@/models/User';

export class ApiService {
  getMessages(): Message[] {
    let messages: Message[] = [];
    fetch(`${process.env.API_PATH}/messages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => { messages = data; })
      .catch((error) => {
        console.error('Error:', error);
      });
    return messages;
  }

  createMessage(text: string, user: User): Message {
    let message: Message = {} as Message;
    fetch(`${process.env.API_PATH}/messages/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        user: user
      })
    })
      .then(response => response.json())
      .then(data => { message = data; })
      .catch((error) => {
        console.error('Error:', error);
      });
    return message;
  }

  createUser(name: string): User {
    let user: User = {} as User;
    fetch(`${process.env.API_PATH}/characters/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name
      })
    })
      .then(response => response.json())
      .then(data => { user = data; })
      .catch((error) => {
        console.error('Error:', error);
      });
    return user;
  }
}
