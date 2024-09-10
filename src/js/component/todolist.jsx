import React, { useEffect, useState } from "react";

const Todolist = () => {

	const [list, setList] = useState([]);
	const [inputValue, setInputValue] = useState("")
	const [itemLeft, setItemLeft] = useState(0)
	const [hoveredIndex, setHoveredIndex] = useState(null);
	
	useEffect(()=>{
		fetch('https://playground.4geeks.com/todo/users/santiagoe16')
		.then(resp => {
			return resp.json();
		})
		.then(data => {
		setList(data.todos.map((item)=>item));
		})
	},[])
	

	const addTask = (e) =>{
		if(e.key === "Enter"){
			if(inputValue.trim() !== ""){
				setItemLeft(list.length + 1)
				
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						"label": inputValue,
						"is_done": false
					})
				};
				fetch('https://playground.4geeks.com/todo/todos/santiagoe16', requestOptions)
				.then(response => response.json())
				.then(data => {
					setList([...list, data]);
				})

				setInputValue("")
			}
		}
	}

	const deleteTask = (element,index) => {
		setList(list.filter((_,i) => i !== index))
		setItemLeft(list.length - 1)

		fetch(`https://playground.4geeks.com/todo/todos/${element.id}`, {method: 'DELETE'})
		.then((response) => response.text())
	}
	
	return (
		<>
			<h1 className="d-flex justify-content-center">todos</h1>
			<div className="m-auto" id="list">
				<input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={addTask} placeholder="What needs to be done?"/>
				<ul>
					{list.map((element, index) => (<li onMouseOver={()=>setHoveredIndex(index)} onMouseOut={()=>setHoveredIndex(index)} key={index}>{element.label}<i style={{visibility: hoveredIndex === index ? 'visible' : 'hidden'}} className="fas fa-times mt-1 ms-2 me-2" onClick={() => deleteTask(element,index)}></i></li>))}
				</ul>
				<footer>{itemLeft} item left</footer>
			</div>
			<div className="decoration-1 m-auto"></div>
			<div className="decoration-2 m-auto"></div>
			
		</>
	);
};

export default Todolist;