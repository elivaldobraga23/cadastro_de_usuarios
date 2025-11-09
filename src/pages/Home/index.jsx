import { useRef, useState } from "react";
import "./style.css";
import Lixeira from "../../assets/trash.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

function Home() {
  const [usuarios, setUsuarios] = useState([]);

  const nomeInput = useRef()
  const idadeInput = useRef();
  const emailInput = useRef();

  function capitalizarNome(nome) {
    return nome
      .toLowerCase()
      .split(" ")
      .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase())
      .join(" ");
  }

  async function cadastrar() {
    if (
      !nomeInput.current.value ||
      !idadeInput.current.value ||
      !emailInput.current.value
    ) {
      toast.error("Por favor, preencha todos os campos!");
      return;
    } else if (
      usuarios.some((usuario) => usuario.email === emailInput.current.value)
    ) {
      toast.error("Este e-mail já está cadastrado!");
      return;
    } else {
      toast.success("Usuário cadastrado com sucesso!");
      const usuario = {
        id: usuarios.length + 1,
        nome: capitalizarNome(nomeInput.current.value),
        idade: idadeInput.current.value,
        email: emailInput.current.value,
      };

      setUsuarios([...usuarios, usuario]);
    }

    nomeInput.current.value = "";
    idadeInput.current.value = "";
    emailInput.current.value = "";
  }

  async function deletar(id) {
    Swal.fire({
      title: "Deseja excluuir este usuário?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const usuariosFiltrados = usuarios.filter((usuario) => usuario.id !== id);
        setUsuarios(usuariosFiltrados);
        Swal.fire(
          "Deletado!",
          "O usuário foi deletado com sucesso.",
          "success"
        );
      }
    });
  }

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Nome" type="text" ref={nomeInput} />
        <input placeholder="Idade" type="number" ref={idadeInput} />
        <input placeholder="E-mail" type="email" ref={emailInput} />
        <button type="button" onClick={cadastrar}>
          Cadastrar
        </button>
      </form>
      {usuarios.map((usuario) => (
        <div key={usuario.id} className="card">
          <div>
            <p>
              Nome: <span>{usuario.nome}</span>
            </p>
            <p>
              Idade: <span>{usuario.idade}</span>{" "}
            </p>
            <p>
              Email: <span>{usuario.email}</span>
            </p>
          </div>
          <button onClick={() => deletar(usuario.id)}>
            <img src={Lixeira} />
          </button>
        </div>
      ))}

      {/* Componente que exibe os toasts */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Home;
