import React, { useState } from 'react'
import "./App.css"
const productData = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]

function FilterableProductTable({ products }) {
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);

    return (
      <div>
        <SearchBar 
          filterText={filterText} 
          inStockOnly={inStockOnly} 
          setFilterText={setFilterText}
          setInStockOnly={setInStockOnly}/>
        <ProductTable 
          products={products}
          filterText={filterText}
          inStockOnly={inStockOnly} />
      </div>
    );
  }

function SearchBar({filterText, inStockOnly, setFilterText, setInStockOnly}){
    return (
        <div>
            <form>
                <input style={{borderRadius:'5px'}} type='text' value={filterText} onChange={(e)=> setFilterText(e.target.value)} onfplaceholder='search...'></input>
                <br/>
                <input type='checkbox' id='checkbox' checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)}></input>
                <label for='checkbox'>
                    {' '}
                    Only show products in stock
                </label>
            </form>
        </div>
    )
}

function ProductCategoryRow({category}){
    return(
            <tr>
                <th colSpan="2">
                    {category}
                </th>
            </tr>
    )
}

function ProductRow({product}){
    const name = product.stocked ? product.name :
        <span style={{ color:'red'}}>
            {product.name}
        </span>
    return(
        <tr>
            <td>
                {name}
            </td>
            <td>
                {product.price}
            </td>
        </tr>
    )
}

function ProductTable({ filterText, inStockOnly}){
    const rows= []
    let lastCategory= ""
    productData.forEach((product) => {
        if (
            product.name.toLowerCase().indexOf(
              filterText.toLowerCase()
            ) === -1
          ) {
            return;
          }
          if (inStockOnly && !product.stocked) {
            return;
          }
        if(product.category !== lastCategory){
            rows.push(
                <ProductCategoryRow category={product.category} key={product.category} />
                );
        }
            rows.push(
                <ProductRow product={product} key={product.name} />
                );
                lastCategory = product.category
    });
   return( 
        <div>
            <thead>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </table>
            </thead>
            <tbody>{rows}</tbody>
        </div>
        )
}

export default function App() {
    return(
        <div>
            <FilterableProductTable products={productData}/>
        </div>
    )
}


