"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/Header";
import UsersContainer from "@/components/UsersContainer";
import Dialog from "@/components/Dialog";
import EditUser from "@/components/EditGuru";
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
      <UsersContainer
        users={users}
        deleteUser = {deleteUser}
        editUser = {editUser}
      />
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


