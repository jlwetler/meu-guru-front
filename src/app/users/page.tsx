"use client";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "@/components/Header";
import { AiOutlineSearch } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
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
  const [maxPage, setMaxPage] = useState(0);
  const [maxUsers, setmaxUsers] = useState(0);
    
  function getMaxUsers() {
    axios
      .get(`http://localhost:4000/users`)
      .then((response) => {
        setmaxUsers(response.data.length)
        setMaxPage(Math.floor(maxUsers / pageSize + 1));
    })
  }
  
  useEffect(getMaxUsers,[maxUsers])

  useEffect(getUsers, [page, pageSize]);

  function getUsers() {
    axios
      .get(`http://localhost:4000/users?page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        setUsers(response.data);
        setMaxPage(Math.floor(maxUsers / pageSize + 1));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setPageSize(parseInt(e.target.value));
    setPage(1);
  }

  function deleteItem(id: number) {
    console.log(`deletou o id ${id}`);
  }
  
  function searchByName(name: string) {
    axios
      .get(`http://localhost:4000/users/name/${name}`)
      .then((response) => {
        setUsers(response.data);
        setmaxUsers(response.data.length)
        setMaxPage(Math.floor(maxUsers / pageSize + 1));
        setEmail("");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  function searchByEmail(email: string) {
    axios
      .get(`http://localhost:4000/users/email/${email}`)
      .then((response) => {
        setUsers(response.data);
        setMaxPage(Math.floor(maxUsers / pageSize + 1));
        setName("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div style={{ background: "#F8F8F8", paddingBottom: "10vh"}}>
      <Header />
      <SearchWrapper>
        <SearchBox>
          <section>Buscar por nome:</section>
          <SearchBar>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <SearchIcon size={25} onClick={() => searchByName(name)}/>
          </SearchBar>
        </SearchBox>
        <SearchBox>
          <section>Buscar por email:</section>
          <SearchBar>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <SearchIcon size={25} onClick={() => searchByEmail(email)}/>
          </SearchBar>
        </SearchBox>
        <SearchBox>
          <nav onClick={()=> getUsers()}>
            <span>Limpar busca</span>
          </nav>
        </SearchBox>
        <SearchBox>
          <Pagination>
            Página {page} de {maxPage}
            <BackwardIcon onClick={() => (page > 1 ? setPage(page - 1) : "")} />
            <ForwardIcon
              onClick={() => (page < maxPage ? setPage(page + 1) : "")}
            />
          </Pagination>
          <Pagination>
            Quantidade por página:
            <select
              onChange={handleChange}
              value={pageSize}
            >
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
              <option>50</option>
            </select>
          </Pagination>
        </SearchBox>
      </SearchWrapper>
      <UserContainer>
        <Description>
          <UserName>Usuário</UserName>
          <UserData>CPF</UserData>
          <UserData>Celular</UserData>
          <UserData>Data de registro</UserData>
          <UserData>Ações</UserData>
        </Description>
        {users.length === 0 ?<NotFoundUser key={404}> <p>Nenhum usuário encontrado</p> </NotFoundUser> :
          users.map((user: User) => (
          <UserInfo key={user.id}>
            <UserName>
              <span>
                <p>{user.name}</p>
                <p style={{ color: "#961322" }}>{user.email}</p>
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
            <EditButton>Editar usuário</EditButton>
            <TrashIcon size={25} onClick={() => deleteItem(user.id)} />
          </UserInfo>
        ))}
      </UserContainer>
    </div>
  );
}

const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90vw;
  height: 100px;
  margin: 70px auto 0 auto;
`;

const SearchBox = styled.div`
  padding: 22px;
  width: 18vw;
  select {
    text-align: center;
    height: 25px;
    width: 50px;
    margin-left: 10px;
    border-radius: 7px;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
    border: none;
  }
  section {
    display: flex;
    align-items: flex-end;
  }
  nav {
    display: flex;
    align-items: center;
    height: 100px;
    span {
      cursor: pointer;
    }
  }
`;

const Pagination = styled.div`
  text-align: right;
  padding: 5px;
`;

const SearchBar = styled.div`
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  width: 20vw;
  height: 40px;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  input {
    border-radius: 10px;
    width: 17vw;
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
  height: 30vh;
`

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

const SearchIcon = styled(AiOutlineSearch)`
  cursor: pointer;
`;

const ForwardIcon = styled(IoIosArrowForward)`
  cursor: pointer;
  margin: 0 6px;
`;

const BackwardIcon = styled(IoIosArrowBack)`
  cursor: pointer;
  margin: 0 6px;
`;