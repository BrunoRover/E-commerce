import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    {
      question: "Qual é o prazo de entrega dos produtos?",
      answer:
        "O prazo de entrega varia entre 5 a 15 dias úteis, dependendo da sua localização.",
    },
    {
      question: "Posso devolver um produto se não estiver satisfeito?",
      answer:
        "Sim, você tem até 30 dias após a entrega para solicitar a devolução.",
    },
    {
      question: "Quais formas de pagamento vocês aceitam?",
      answer: "Aceitamos cartões de crédito, débito, boleto bancário e PIX.",
    },
    {
      question: "Como acompanhar o status do meu pedido?",
      answer:
        "Você pode acompanhar o status diretamente na sua conta, na seção 'Meus Pedidos'.",
    },
    {
      question: "Vocês oferecem garantia para os produtos?",
      answer:
        "Sim, todos os produtos têm garantia de até 12 meses, dependendo do item.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Perguntas Frequentes
      </h2>
      <div className="space-y-4">
        {questions.map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-4 py-3 bg-gray-200 font-medium text-gray-700 hover:bg-gray-300"
            >
              {item.question}
            </button>
            {activeIndex === index && (
              <div className="px-4 py-3 bg-white text-gray-600">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
