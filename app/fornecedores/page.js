'use client';

import { useState, useEffect } from 'react';

export default function CadastroFornecedor() {
  const [nome, setNome] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('');
  const [quantidadePedidosMinimos, setQuantidadePedidosMinimos] = useState(0);
  const [entregaParaBrasil, setEntregaParaBrasil] = useState(false);
  const [contato, setContato] = useState('');
  const [linkInstagram, setLinkInstagram] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [fornecedores, setFornecedores] = useState([]);
  const [editandoFornecedor, setEditandoFornecedor] = useState(null);  // Novo estado para controle de edição

  // Função para enviar os dados do formulário para a API
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const fornecedorData = {
      nome,
      formaPagamento,
      quantidadePedidosMinimos,
      entregaParaBrasil,
      contato,
      linkInstagram,
    };
  
    try {
      let response;
      const url = editandoFornecedor
        ? `/api/fornecedores/${editandoFornecedor.id}` // Aqui está a URL com o ID
        : '/api/fornecedores';
  
      console.log('Requisição para:', url); // Verifica a URL antes de enviar
  
      if (editandoFornecedor) {
        // Se estamos editando, chamamos o método PUT
        response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fornecedorData),
        });
      } else {
        // Se estamos criando, chamamos o método POST
        response = await fetch('/api/fornecedores', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fornecedorData),
        });
      }
  
      if (response.ok) {
        const result = await response.json();
        setMensagem('Fornecedor ' + (editandoFornecedor ? 'atualizado' : 'cadastrado') + ' com sucesso!');
        setEditandoFornecedor(null); // Resetar estado de edição após sucesso
        fetchFornecedores(); // Recarregar a lista de fornecedores
        // Resetar os campos após a operação
        setNome('');
        setFormaPagamento('');
        setQuantidadePedidosMinimos(0);
        setEntregaParaBrasil(false);
        setContato('');
        setLinkInstagram('');
      } else {
        setMensagem('Erro ao ' + (editandoFornecedor ? 'atualizar' : 'cadastrar') + ' fornecedor.');
        console.log('Erro ao atualizar fornecedor:', response.status); // Log do status de erro
      }
    } catch (error) {
      setMensagem('Erro ao ' + (editandoFornecedor ? 'atualizar' : 'cadastrar') + ' fornecedor.');
      console.error('Erro ao fazer a requisição:', error); // Log do erro
    }
  };
  

  // Função para carregar os fornecedores cadastrados
  const fetchFornecedores = async () => {
    try {
      const response = await fetch('/api/fornecedores');
      const fornecedores = await response.json();
      setFornecedores(fornecedores);
    } catch (error) {
      console.error('Erro ao carregar fornecedores', error);
    }
  };

  // Função para deletar um fornecedor
  const handleDelete = async (id) => {
    try {
      const response = await fetch('/api/fornecedores', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setMensagem('Fornecedor deletado com sucesso!');
        fetchFornecedores(); // Atualizar a lista de fornecedores após deletar
      } else {
        setMensagem('Erro ao deletar fornecedor.');
      }
    } catch (error) {
      setMensagem('Erro ao deletar fornecedor.');
    }
  };

  // Função para iniciar a edição de um fornecedor
  const handleEdit = (fornecedor) => {
    setNome(fornecedor.nome);
    setFormaPagamento(fornecedor.formaPagamento);
    setQuantidadePedidosMinimos(fornecedor.quantidadePedidosMinimos);
    setEntregaParaBrasil(fornecedor.entregaParaBrasil);
    setContato(fornecedor.contato);
    setLinkInstagram(fornecedor.linkInstagram);
    setEditandoFornecedor(fornecedor); // Definir que estamos editando
  };

  // Carregar fornecedores ao carregar a página
  useEffect(() => {
    fetchFornecedores();
  }, []);

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">{editandoFornecedor ? 'Alterar Fornecedor' : 'Cadastrar Fornecedor'}</h1>

      {mensagem && <div className="mb-4 text-green-500">{mensagem}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nome do Fornecedor</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Forma de Pagamento</label>
          <input
            type="text"
            value={formaPagamento}
            onChange={(e) => setFormaPagamento(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Quantidade Mínima de Pedidos</label>
          <input
            type="number"
            value={quantidadePedidosMinimos}
            onChange={(e) => setQuantidadePedidosMinimos(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Entrega para Todo Brasil?</label>
          <input
            type="checkbox"
            checked={entregaParaBrasil}
            onChange={(e) => setEntregaParaBrasil(e.target.checked)}
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Contato</label>
          <input
            type="text"
            value={contato}
            onChange={(e) => setContato(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Link do Instagram</label>
          <input
            type="url"
            value={linkInstagram}
            onChange={(e) => setLinkInstagram(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 w-full rounded"
        >
          {editandoFornecedor ? 'Atualizar Fornecedor' : 'Cadastrar Fornecedor'}
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-8 mb-4">Fornecedores Cadastrados</h2>
      {fornecedores.length === 0 ? (
        <p>Não há fornecedores cadastrados.</p>
      ) : (
        <ul className="space-y-4">
          {fornecedores.map((fornecedor) => (
            <li key={fornecedor.id} className="border-b pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{fornecedor.nome}</h3>
                  <p>Forma de Pagamento: {fornecedor.formaPagamento}</p>
                  <p>Contato: {fornecedor.contato}</p>
                  <p>Entrega para Brasil: {fornecedor.entregaParaBrasil ? 'Sim' : 'Não'}</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleEdit(fornecedor)}
                  >
                    Alterar
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(fornecedor.id)}
                  >
                    Deletar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}
