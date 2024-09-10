import React, { useEffect, useState } from "react";

const Todolist = () => {

	const [list, setList] = useState([]);
	const [inputValue, setInputValue] = useState("")
	const [hoveredIndex, setHoveredIndex] = useState(null);
	
	useEffect(()=>{
		fetch('https://playground.4geeks.com/todo/users/santiagoe16')
		.then(resp => {
			return resp.json();
		})
		.then(data => {
		setList(data.todos);
		})
	},[])
	

	const addTask = (e) =>{
		if(e.key === "Enter"){
			if(inputValue.trim() !== ""){
				
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
					setList(prevList => [...prevList, data]);
				})

				setInputValue("")
			}
		}
	}

	const deleteTask = (element,index) => {
		setList(list.filter((_,i) => i !== index))

		fetch(`https://playground.4geeks.com/todo/todos/${element.id}`, {method: 'DELETE'})
		.then((response) => response.text())
	}

	const cleanTasks = async () =>{

		for (let item of list) {
			await fetch(`https://playground.4geeks.com/todo/todos/${item.id}`, {
			  method: 'DELETE',
			});
		}
		setList([]);
	}
	
	return (
		<>
			<h1 className="d-flex justify-content-center">todos</h1>
			<div className="m-auto" id="list">
				<input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={addTask} placeholder="What needs to be done?"/>
				<ul>
					{list.map((element, index) => (<li onMouseEnter={()=>setHoveredIndex(index)} onMouseLeave={()=>setHoveredIndex(null)} key={index}>{element.label}<i style={{visibility: hoveredIndex === index ? 'visible' : 'hidden'}} className="fas fa-times mt-1 me-2 ms-2" onClick={() => deleteTask(element,index)}></i></li>))}
				</ul>
				<div className="d-flex justify-content-between align-items-center">
				<footer>{list.length} item left</footer>
				<button className="me-2 button-clear" onClick={cleanTasks}>Clear</button>
				</div>
			</div>
			<div className="decoration-1 m-auto"></div>
			<div className="decoration-2 m-auto"></div>
			
		</>
	);
};

export default Todolist;