"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "@/components/Header";
import { BiTrash } from "react-icons/bi";
import dayJS from "dayjs";
import Dialog from "@/components/Dialog";
import EditUser from "@/components/EditGuru";
import Image from "next/image";
import User from "@/interfaces/UserInterface";
import SearchOptions from "@/components/SearchOptions";

export default function ListUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [maxPage, setMaxPage] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [open, setOpen] = useState(false);
  const [editUserId, setEditUserId] = useState(0);

  useEffect(getUsers, [page, pageSize, totalUsers]);

  function getUsers() {
    axios
      .get(`http://localhost:4000/users?page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        setUsers(response.data.users);
        setTotalUsers(response.data.totalUsers);
        totalUsers % pageSize !== 0
          ? setMaxPage(Math.floor(totalUsers / pageSize + 1))
          : setMaxPage(Math.ceil(totalUsers / pageSize));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteUser(id: number) {
    if (window.confirm("Tem certeza que deseja deletar o usuário?")) {
      axios
        .delete(`http://localhost:4000/users/${id}`)
        .then((response) => {
          getUsers();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function editUser(id: number) {
    setEditUserId(id);
    setOpen(true);
    console.log(editUserId);
  }

  return (
    <div style={{ background: "#F8F8F8", paddingBottom: "10vh" }}>
      <Header />
      <SearchOptions 
      setUsers={setUsers}
      page={page}
      setPage={setPage}
      maxPage={maxPage}
      pageSize={pageSize}
      setPageSize={setPageSize}
      getUsers={getUsers}
      />
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
                  <p style={{ color: "#5f00db",  fontWeight: "bold"}}>{user.email}</p>
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
      <Dialog open={open} onClose={() => setOpen(false)}>
        <EditUser
          open={open}
          onClose={() => setOpen(false)}
          id={editUserId}
          getUsers={getUsers}
        />
      </Dialog>
    </div>
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
