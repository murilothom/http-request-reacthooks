import { useState } from 'react';
import { useFetch } from './hooks/useFetch';

import './App.css';

const url = "http://localhost:3000/products/";

function App() {

  const { data: items, httpConfig, loading, error } = useFetch(url);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleDelete = (id) => {
    httpConfig(id, "DELETE");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

     const product = {
       name,
       price
     };

    httpConfig(product, "POST");

    setName('');
    setPrice('');
  };

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}
      {(!loading && !error) && <ul>
        {items && items.map((product) => (
          <li key={product.id}>
            {product.name} - R$: {product.price}
          <button onClick={() => handleDelete(product.id)}>Remover</button>
          </li>
          
        ))}
      </ul>}
      <div className="add-products">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Preço:
            <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value) } required />
          </label>
          {loading && <input type="submit" disabled value="Aguarde" />}
          {!loading && <input type="submit" value="Criar" />}
        </form>
      </div>
    </div>
  );
}

export default App;
