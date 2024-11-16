import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { nome, formaPagamento, quantidadePedidosMinimos, entregaParaBrasil, contato, linkInstagram } = await request.json();

    // Garantir que 'quantidadePedidosMinimos' seja um inteiro
    const quantidadePedidosMinimosInt = parseInt(quantidadePedidosMinimos, 10);

    // Criando o fornecedor no banco de dados
    const fornecedores = await prisma.fornecedores.create({
      data: {
        nome,
        formaPagamento,
        quantidadePedidosMinimos: quantidadePedidosMinimosInt,  // Atribuindo o valor inteiro
        entregaParaBrasil,
        contato,
        linkInstagram,
      },
    });

    return new Response(JSON.stringify(fornecedores), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erro ao criar fornecedor:', error);  // Exibe o erro completo
    return new Response('Erro ao criar o fornecedor', { status: 500 });
  }
}
