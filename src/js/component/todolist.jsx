import React, { useState } from "react";


//		insertar el valor al array
//		mapeo el array y lo devuelvo en varios li y un ul
// 		añado los botones de eliminar y su funcionalidad

//create your first component
const Todolist = () => {

	const [list, setList] = useState([]);
	const [inputValue, setInputValue] = useState("")
	const [itemLeft, setItemLeft] = useState(0)
	const [hoveredIndex, setHoveredIndex] = useState(null);

	const handleKey = (e) =>{
		if(e.key === "Enter"){
			if(inputValue.trim() !== ""){
				setList([...list, inputValue]);
				setInputValue("")
				setItemLeft(list.length + 1)
			}
		}
	}

	const deleteTask = (index) => {
		setList(list.filter((_,i) => i !== index))
		setItemLeft(list.length - 1)
		
	}
	
	return (
		<>
			<h1 className="d-flex justify-content-center">todos</h1>
			<div className="m-auto" id="list">
				<input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKey} placeholder="What needs to be done?"/>
				<ul>
					{list.map((element, index) => (<li onMouseOver={()=>setHoveredIndex(index)} onMouseOut={()=>setHoveredIndex(index)} key={index}>{element} <i style={{visibility: hoveredIndex === index ? 'visible' : 'hidden'}} className="fas fa-times mt-1 ms-2 me-2" id="icon" onClick={() => deleteTask(index)}></i></li>))}
				</ul>
				<footer>{itemLeft} item left</footer>
			</div>
			<div className="decoration-1 m-auto"></div>
			<div className="decoration-2 m-auto"></div>
			
		</>
	);
};

export default Todolist;
