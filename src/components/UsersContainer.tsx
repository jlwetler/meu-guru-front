import styled from "styled-components";
import { BiTrash } from "react-icons/bi";
import dayJS from "dayjs";
import Image from "next/image";
import User from "@/interfaces/UserInterface";

interface UserProps {
  users: User[],
  deleteUser: (id: number) => void,
  editUser: (id: number) => void,
}

export default function UsersContainer({users, deleteUser, editUser}: UserProps) {

  return (
    <>
      <UserContainer>
        <Description>
          <UserName>Usuário</UserName>
          <UserData>CPF</UserData>
          <UserData>Celular</UserData>
          <UserData>Data de registro</UserData>
          <UserData>Ações</UserData>
        </Description>
        {users.length === 0 ? (
          <NotFoundUser key={404}>
            <Image
              src="/images/not-found.Jpg"
              width={600}
              height={170}
              alt="users not found"
            />
          </NotFoundUser>
        ) : (
          users.map((user: User) => (
            <UserInfo key={user.id}>
              <UserName>
                <span>
                  <p>{user.name}</p>
                  <p style={{ color: "#5f00db", fontWeight: "bold" }}>
                    {user.email}
                  </p>
                </span>
              </UserName>
              <UserData>
                <p>{user.cpf}</p>
              </UserData>
              <UserData>
                <p>{user.phone}</p>
              </UserData>
              <UserData>
                <p>{dayJS(user.createdAt).format("DD/MM/YYYY")}</p>
              </UserData>
              <EditButton onClick={() => editUser(user.id)}>
                Editar usuário
              </EditButton>
              <TrashIcon size={25} onClick={() => deleteUser(user.id)} />
            </UserInfo>
          ))
        )}
      </UserContainer>
    </>
  );
}

const UserContainer = styled.div`
  width: 90vw;
  margin: 20px auto;
  border-radius: 30px;
  border-box: 1px solid;
`;

const Description = styled.section`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 5px;
`;

const UserName = styled.div`
  margin-left: 3vw;
  width: 20vw;
`;

const UserData = styled.div`
  text-align: center;
  width: 10vw;
  margin: 3vw;
`;

const NotFoundUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90vw;
  height: 53vh;
`;

const UserInfo = styled.div`
  background: #fff;
  display: flex;
  align-items: center;
  height: 80px;
  margin: 3vh auto;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const EditButton = styled.div`
  color: #5f00db;
  display: flex;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 30px;
  margin: 0 2vw;
  border: 1px solid #5f00db;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background: #d8bfd8;
  }
`;

const TrashIcon = styled(BiTrash)`
  cursor: pointer;
  margin-left: 15px;
`;