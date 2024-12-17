import { useState } from "react";

const AddProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [starReviews, setStarReviews] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/products/submitProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, price, starReviews }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Sucesso:", data);
      setName("");
      setDescription("");
      setPrice("");
      setStarReviews("");
    } catch (error) {
      console.error("Erro ao enviar produto:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Preço"
      />
      <input
        type="number"
        value={starReviews}
        onChange={(e) => setStarReviews(e.target.value)}
        placeholder="Avaliações com Estrelas"
      />
      <button type="submit">Adicionar Produto</button>
    </form>
  );
};

export default AddProductForm;
