import bcrypt from 'bcryptjs';

export interface IUser {
    name: string;
    email: string;
    password: string;
    isAdmin?: boolean;
}

const users: IUser[] = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Carlota Joaquina',
    email: 'carlota@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Lucas Guilherme',
    email: 'lucas@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
