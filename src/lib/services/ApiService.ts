import { Message } from '@/models/Message';
import { User } from '@/models/User';

export class ApiService {
  async getMessages(): Promise<Message[]>{
    return (await fetch(`${process.env.VUE_APP_NODE_API_PATH}/messages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })).json();
  }

  async createMessage(text: string, user: User): Promise<Message> {
    return (await fetch(`${process.env.VUE_APP_NODE_API_PATH}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        author: user
      })
    })).json();
  }

  async createUser(name: string): Promise<User> {
    return (await fetch(`${process.env.VUE_APP_NODE_API_PATH}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name
      })
    })).json();
  }
}
