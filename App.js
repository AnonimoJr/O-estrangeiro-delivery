import React, {useState} from 'react';
import axios from 'axios';

const products = [
  { id:1, name:'Hambúrguer Alcatra', price_cents:2500 },
  { id:2, name:'Caixa Pizza + Hambúrguer', price_cents:4500 },
  { id:3, name:'Porção Batata com cheddar e bacon', price_cents:1800 }
];

export default function App(){
  const [cart, setCart] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  function add(p){ setCart([...cart, p]); }

  async function checkout(){
    const items = cart;
    const r = await axios.post((process.env.REACT_APP_API_URL || 'http://localhost:10000') + '/api/orders', {
      items, customer: { name, phone }, paymentMethod: 'offline'
    });
    alert('Pedido criado: ' + r.data.orderId);
  }

  return (
    <div style={{maxWidth:800, margin:'20px auto', fontFamily:'Arial, sans-serif'}}>
      <h1>O Estrangeiro Delivery — Cardápio</h1>
      {products.map(p=>(
        <div key={p.id} style={{border:'1px solid #ddd', padding:10, marginBottom:8}}>
          <strong>{p.name}</strong>
          <div>R$ {(p.price_cents/100).toFixed(2)}</div>
          <button onClick={()=>add(p)}>Adicionar</button>
        </div>
      ))}
      <div style={{marginTop:20}}>
        <h2>Carrinho</h2>
        {cart.length===0 && <div>Vazio</div>}
        {cart.map((c,i)=> <div key={i}>{c.name} - R$ {(c.price_cents/100).toFixed(2)}</div>)}
        {cart.length>0 && (
          <>
            <div style={{marginTop:10}}>
              <input placeholder="Seu nome" value={name} onChange={e=>setName(e.target.value)} />
              <input placeholder="Telefone (+5511...)" value={phone} onChange={e=>setPhone(e.target.value)} />
            </div>
            <button onClick={checkout} style={{marginTop:10}}>Finalizar pedido</button>
          </>
        )}
      </div>
    </div>
  );
}
