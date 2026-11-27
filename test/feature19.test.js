"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const feature = require("../src/features/feature19");

test("identifica o menor valor de uma lista numérica", () => {
  assert.equal(feature.execute({ valores: [8, 2, 5] }).menor, 2);
});

test("aceita limite com lista de um item e números negativos", () => {
  assert.equal(feature.execute({ valores: [10] }).menor, 10);
  assert.equal(feature.execute({ valores: [-3, 0, -1] }).menor, -3);
});

test("aceita números decimais", () => {
  assert.equal(feature.execute({ valores: [2.5, 2.4, 3.1] }).menor, 2.4);
});

test("rejeita lista vazia, tipos inválidos e itens não finitos", () => {
  const entradasInvalidas = [
    { valores: [] },
    { valores: "1,2" },
    { valores: [1, "2"] },
    { valores: [1, Infinity] }
  ];

  for (const input of entradasInvalidas) {
    assert.throws(() => feature.execute(input), { name: "Error" });
  }
});
