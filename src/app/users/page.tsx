"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "@/components/Header";
import { AiOutlineSearch } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import dayJS from "dayjs";
import Container from "@/components/Container";
import Loading from "@/components/Loading";

interface User {
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

export default function ListUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(getUsers, []);
  console.log(users);
  function getUsers() {
    axios
      .get(`http://localhost:4000/users?page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteItem(id: number) {
    console.log(`deletou o id ${id}`);
  }
  function searchByName() {
    console.log(`procura por nome`);
  }
  function searchByEmail() {
    console.log(`procura por email`);
  }

  return (
    <div style={{ background: "#F8F8F8" }}>
      <Header />
      
      <UserContainer>
        <Description>
          <UserName>Usuário</UserName>
          <Quantity>CPF</Quantity>
          <Quantity>Celular</Quantity>
          <Quantity>Data de registro</Quantity>
          <Quantity>Ações</Quantity>
        </Description>
        {users.map((user: User) => (
          <UserInfo key={user.id}>
            <UserName>
              <span>
                <p>{user.name}</p>
                <p style={{ color: "#961322" }}>{user.email}</p>
              </span>
            </UserName>
            <Quantity>
              <p>{user.cpf}</p>
            </Quantity>
            <Quantity>
              <p>{user.phone}</p>
            </Quantity>
            <Quantity>
              <p>{dayJS(user.createdAt).format("DD/MM/YYYY")}</p>
            </Quantity>
            <EditButton>Editar usuário</EditButton>
            <TrashIcon size={25} onClick={() => deleteItem(user.id)} />
          </UserInfo>
        ))}
      </UserContainer>
    </div>
  );
}

const UserContainer = styled.div`
  width: 90vw;
  margin: 100px auto;
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

const Quantity = styled.div`
  text-align: center;
  width: 10vw;
  margin: 3vw;
`;

const TrashIcon = styled(BiTrash)`
  cursor: pointer;
  margin-left: 15px;
`;

const SearchIcon = styled(AiOutlineSearch)`
  cursor: pointer;
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

/*          <SearchBar>
            <input
              type="text"
              placeholder="Pesquisar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              required
            />
            <div onClick={searchItem}>
              <AiOutlineSearch size={30} />
            </div>
          </SearchBar>
const SearchBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 450px;
    height: 40px;
    border: 2px solid #000;
    border-radius: 50px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.5);
    input {
        border-radius: 50px;
        width: 400px;
        height: 36px;
        border: none;
    }
    input:focus {
        outline: none;
      }
    div {
        width: 40px;
        text-align: center;
        border-left: 1px solid #000;
        cursor: pointer;
    }    
`;
*/
