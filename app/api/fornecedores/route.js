import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { nome, formaPagamento, quantidadePedidosMinimos, entregaParaBrasil, contato, linkInstagram } = await request.json();

    // Garantir que 'quantidadePedidosMinimos' seja um inteiro válido
    const quantidadePedidosMinimosInt = parseInt(quantidadePedidosMinimos, 10);
    if (isNaN(quantidadePedidosMinimosInt)) {
      return new Response('Quantidade de pedidos mínimos inválida', { status: 400 });
    }

    // Criando o fornecedor no banco de dados
    const fornecedor = await prisma.fornecedor.create({
      data: {
        nome,
        formaPagamento,
        quantidadePedidosMinimos: quantidadePedidosMinimosInt,  // Atribuindo o valor inteiro
        entregaParaBrasil,
        contato,
        linkInstagram,
      },
    });

    return new Response(JSON.stringify(fornecedor), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erro ao criar fornecedor:', error);  // Exibe o erro completo
    return new Response('Erro ao criar o fornecedor', { status: 500 });
  }
}

export async function GET() {
  try {
    // Buscando todos os fornecedores no banco de dados
    const fornecedores = await prisma.fornecedor.findMany();

    return new Response(JSON.stringify(fornecedores), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erro ao buscar fornecedores:', error);

    return new Response('Erro ao buscar fornecedores', { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    console.log('Dados recebidos na requisição:', data); // Log para depurar os dados recebidos

    const {
      id,
      nome,
      formaPagamento,
      quantidadePedidosMinimos,
      entregaParaBrasil,
      contato,
      linkInstagram,
    } = data;

  } catch (error) {
    console.error('Erro ao atualizar fornecedor:', error);
    return new Response('Erro ao atualizar fornecedor', { status: 500 });
  }
}


export async function DELETE(request) {
  try {
    const { id } = await request.json();

    // Verificando se o ID é um número válido
    const idNumber = Number(id);
    if (isNaN(idNumber)) {
      return new Response('ID inválido', { status: 400 });
    }

    // Verificando se o fornecedor existe
    const fornecedorExistente = await prisma.fornecedor.findUnique({
      where: { id: idNumber },  // Garantir que o id seja um número
    });

    if (!fornecedorExistente) {
      return new Response('Fornecedor não encontrado', { status: 404 });
    }

    // Deletando o fornecedor no banco de dados
    await prisma.fornecedor.delete({
      where: { id: idNumber },  // Garantir que o id é um número
    });

    return new Response('Fornecedor deletado com sucesso', {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erro ao deletar fornecedor:', error);
    return new Response('Erro ao deletar fornecedor', { status: 500 });
  }
}
