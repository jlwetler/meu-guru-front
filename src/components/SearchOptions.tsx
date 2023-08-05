import Link from 'next/link';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { AiOutlineClear, AiOutlineSearch } from 'react-icons/ai';
import { BiHome } from 'react-icons/bi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import User from "@/interfaces/UserInterface";
import axios from 'axios';
import styled from 'styled-components';

interface SearchProps {
  setUsers: Dispatch<SetStateAction<User[]>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  maxPage: number;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  getUsers: () => void;
}

export default function SearchOptions({ setUsers, page, setPage, maxPage, pageSize, setPageSize, getUsers } : SearchProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function searchByName(name: string) {
    axios
      .get(`http://localhost:4000/users/name/${name}`)
      .then((response) => {
        setUsers(response.data);
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
        setName("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function clearSearch() {
    setName("");
    setEmail("");
    getUsers();
  }

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setPageSize(parseInt(e.target.value));
    setPage(1);
  }

  return(
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
            <SearchIcon size={25} onClick={() => searchByName(name)} />
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
            <SearchIcon size={25} onClick={() => searchByEmail(email)} />
          </SearchBar>
        </SearchBox>
        <SearchBox>
          <NavOptions>
            <nav onClick={() => clearSearch()}>
              <span><AiOutlineClear />Limpar busca</span>
            </nav>
            <Link href='/'>
              <nav>
                <span><BiHome />Voltar para home</span>
              </nav>
            </Link>

          </NavOptions>
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
            <select onChange={handleChange} value={pageSize}>
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
              <option>50</option>
            </select>
          </Pagination>
        </SearchBox>
      </SearchWrapper>
  )
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
`;

const NavOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  width: 20vw;
  span {
    cursor: pointer;
  }
  a {
    text-decoration: none;
    color: #000;
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