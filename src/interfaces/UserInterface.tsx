export default interface User {
  map(
    arg0: (user: User) => import("react").JSX.Element
  ): import("react").ReactNode;
  id: number;
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  createdAt: Date;
}