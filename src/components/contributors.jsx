import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import dataContributors from "../js/data_contributors";

const Contributors = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contributors, setContributor] = useState(dataContributors);
  const [search, setSearch] = useState("");

  const add = (event) => {
    event.preventDefault();
    const newContributor = {
      name: name,
      lastName: lastName,
      email: email,
    };
    setContributor([...contributors, newContributor]);
    setName("");
    setLastName("");
    setEmail("");
  };

  const toDelete = (index, name, lastName) => {
    const elementToDelete = index;
    const nameToDelete = name;
    const lastNameToDelete = lastName;
    const confirm = window.confirm(
      `Estás seguro que deseas eliminar a ${nameToDelete} ${lastNameToDelete}?`
    );
    if (!confirm) {
      return;
    } else {
      contributors.splice(elementToDelete, 1);
      setContributor([...contributors]);
    }
  };

  return (
    <>
      <h2 className="text-center">Ingresar colaborador</h2>
      <form onSubmit={add} className="my-4 mx-auto">
        <InputGroup className="mb-3">
          <InputGroup.Text>@</InputGroup.Text>
          <Form.Control
            placeholder="Nombre"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>@</InputGroup.Text>
          <Form.Control
            placeholder="Apellido"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <InputGroup.Text id="basic-addon2">@ejemplo.com</InputGroup.Text>
        </InputGroup>
        <Button
          type="submit"
          variant="secondary"
          disabled={(name === "" && lastName === "") || email === ""}
        >
          Aceptar
        </Button>
      </form>
      <h2 className="text-center my-4">Listado de colaboradores</h2>
      <div className="d-flex align-items-center searchInput">
        <Form.Control
          placeholder="Buscar"
          onChange={(e) => setSearch(e.target.value)}
          className="w-25 ms-auto mb-4"
        />
        <i className="bi bi-search mb-4 searchIcon"></i>
      </div>
      <Table striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Email</th>
            <th className="text-center">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {contributors.map((element, index) => {
            const name = element.name.toLowerCase();
            const lastName = element.lastName.toLowerCase();
            const completeName = `${name} ${lastName}`
            if (
              search === "" ||
              completeName.includes(search.toLowerCase())
            )
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{element.name}</td>
                  <td>{element.lastName}</td>
                  <td>{element.email}</td>
                  <td className="text-center">
                    <Button
                      variant="outline-danger"
                      onClick={() =>
                        toDelete(index, element.name, element.lastName)
                      }
                    >
                      X
                    </Button>
                  </td>
                </tr>
              );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default Contributors;
