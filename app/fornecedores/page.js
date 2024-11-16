'use client';

import { useState } from 'react';

export default function CadastroFornecedor() {
  const [nome, setNome] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('');
  const [quantidadePedidosMinimos, setQuantidadePedidosMinimos] = useState(0);
  const [entregaParaBrasil, setEntregaParaBrasil] = useState(false);
  const [contato, setContato] = useState('');
  const [linkInstagram, setLinkInstagram] = useState('');
  const [mensagem, setMensagem] = useState('');

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
      const response = await fetch('/api/fornecedores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fornecedorData),
      });

      const result = await response.json();

      if (response.ok) {
        setMensagem('Fornecedor cadastrado com sucesso!');
        // Resetar os campos após o cadastro
        setNome('');
        setFormaPagamento('');
        setQuantidadePedidosMinimos(0);
        setEntregaParaBrasil(false);
        setContato('');
        setLinkInstagram('');
      } else {
        setMensagem('Erro ao cadastrar fornecedor.');
      }
    } catch (error) {
      setMensagem('Erro ao cadastrar fornecedor.');
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Fornecedor</h1>

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
          Cadastrar Fornecedor
        </button>
      </form>
    </div>
  );
}
