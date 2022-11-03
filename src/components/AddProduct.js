import React from "react";

const AddProduct = () => {
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company, setCompany] = React.useState("");
    const [error, setError] = React.useState(false);

    const addProduct = async () => {
        console.log(!name);
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }
        console.log(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem('user'))._id; // JSON format
        console.log(userId);
        let result = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        console.log(result);
    }

    return (
        <div className="product">
            <h1>Add Product</h1>
            <input className="inputBox" type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter product name" />
            {error && !name && <span className="fieldError">Enter valid name</span>}
            <input className="inputBox" type="text" onChange={(e) => setPrice(e.target.value)} value={price} placeholder="Enter product price" />
            {error && !price && <span className="fieldError">Enter valid price</span>}
            <input className="inputBox" type="text" onChange={(e) => setCategory(e.target.value)} value={category} placeholder="Enter product category" />
            {error && !category && <span className="fieldError">Enter valid category</span>}
            <input className="inputBox" type="text" onChange={(e) => setCompany(e.target.value)} value={company} placeholder="Enter product company name" />
            {error && !company && <span className="fieldError">Enter valid company</span>}
            <button onClick={addProduct} className="registerButton" type="button">Add Product</button>
        </div>
    )
}
export default AddProduct;