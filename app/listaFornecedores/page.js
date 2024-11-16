'use client';

import { useEffect, useState } from 'react';

export default function FornecedoresPage() {
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para buscar os fornecedores da API
    const fetchFornecedores = async () => {
      try {
        const response = await fetch('/api/fornecedores');
        if (!response.ok) throw new Error('Erro ao carregar fornecedores');
        
        const data = await response.json();
        setFornecedores(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFornecedores();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Fornecedores</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">Forma de Pagamento</th>
            <th className="px-4 py-2">Quantidade Mínima de Pedidos</th>
            <th className="px-4 py-2">Entrega para Brasil</th>
            <th className="px-4 py-2">Contato</th>
            <th className="px-4 py-2">Instagram</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map((fornecedor) => (
            <tr key={fornecedor.id}>
              <td className="px-4 py-2">{fornecedor.nome}</td>
              <td className="px-4 py-2">{fornecedor.formaPagamento}</td>
              <td className="px-4 py-2">{fornecedor.quantidadePedidosMinimos}</td>
              <td className="px-4 py-2">{fornecedor.entregaParaBrasil ? 'Sim' : 'Não'}</td>
              <td className="px-4 py-2">{fornecedor.contato}</td>
              <td className="px-4 py-2">
                <a href={fornecedor.linkInstagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
