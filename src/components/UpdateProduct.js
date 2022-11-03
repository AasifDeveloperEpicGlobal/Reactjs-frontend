import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company, setCompany] = React.useState("");
    const param = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getProductDetail = async () => {
            let result = await fetch(`http://localhost:5000/product/${param.id}`)
            result = await result.json();
            console.log(result);
            setName(result.name)
            setPrice(result.price)
            setCategory(result.category)
            setCompany(result.company)
        }

        getProductDetail();
    }, []);

    const updateProduct = async () => {
        console.log(name, price, category, company);
        let result = await fetch(`http://localhost:5000/product/${param.id}`, {
            method: 'put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        console.log("result:: " + result);
        navigate('/')
    }

    return (
        <div className="product">
            <h1>Update Product</h1>
            <input className="inputBox" type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter product name" />
            <input className="inputBox" type="text" onChange={(e) => setPrice(e.target.value)} value={price} placeholder="Enter product price" />
            <input className="inputBox" type="text" onChange={(e) => setCategory(e.target.value)} value={category} placeholder="Enter product category" />
            <input className="inputBox" type="text" onChange={(e) => setCompany(e.target.value)} value={company} placeholder="Enter product company name" />
            <button onClick={updateProduct} className="registerButton" type="button">Update Product</button>
        </div>
    )
}
export default UpdateProduct;