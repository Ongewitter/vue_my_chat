import { Message } from '@/models/Message';
import { User } from '@/models/User';

export class ApiService {
  performFetch(url: string, options: any){
    return fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          return response.json().then(error => {throw new Error(error.message)})
        }
        return response.json()
      });
  }

  createUser(name: string) {
    const url = `${process.env.VUE_APP_NODE_API_PATH}/users`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name
      })
    }
    return this.performFetch(url, options)
  }

  getMessages() {
    const url = `${process.env.VUE_APP_NODE_API_PATH}/messages`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return this.performFetch(url, options)
  }

  createMessage(text: string, user: User) {
    const url = `${process.env.VUE_APP_NODE_API_PATH}/messages`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        author: user
      })
    };
    return this.performFetch(url, options)
  }
}
