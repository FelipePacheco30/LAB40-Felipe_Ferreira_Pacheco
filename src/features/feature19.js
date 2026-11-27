// Funcionalidade 19: Identificador de menor valor.
// Objetivo: Retorna o menor elemento de uma lista numérica.
// Exemplo de entrada: { valores: [8, 2, 5] }
// Implemente conforme as regras e critérios do enunciado fornecido pelo professor.

const implemented = true;

// Desenvolva a regra de negócio e valide todos os dados de entrada.
function execute(input) {
  const { valores } = input || {};

  if (!Array.isArray(valores) || valores.length === 0 || !valores.every(Number.isFinite)) {
    throw new Error("Informe um array não vazio de números finitos.");
  }

  return { menor: Math.min(...valores) };
}

// Mantém o contrato de integração utilizado pela API central.
module.exports = {
  id: 19,
  name: "Identificador de menor valor",
  description: "Retorna o menor elemento de uma lista numérica.",
  implemented,
  execute
};
