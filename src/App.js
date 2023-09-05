// src/App.js
import { useState } from 'react'
import './App.css'
import contacts from "./contacts.json";
//indexof or find or includes
function App() {
  const firstFive = contacts.slice(0, 5);

  const [finalContacts, setContacts] = useState(firstFive);
  const addRandomContact = () => {
		const remainingContacts = contacts.filter(contact => !finalContacts.includes(contact))
		if (remainingContacts.length === 0) {
			return
		}
		const randomIndex = Math.floor(Math.random() * remainingContacts.length)
		const randomContact = remainingContacts[randomIndex]

		setContacts([randomContact, ...finalContacts])
	}


	const sortByName = () => {
		const copy = [...finalContacts]
		copy.sort((a, b) => {
			return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
		})

		setContacts(copy)
	}
    
  
  const sortByPopularity = () => {
    setContacts((previousContacts) => {
      const copy = [...previousContacts];
      copy.sort((a, b) => b.popularity - a.popularity);

      return copy;
    });
  };


const deleteContact = id => {
		const remainingContacts = finalContacts.filter(contact => contact.id !== id)

		setContacts(remainingContacts)
	}

  return (
    <div className="App">
      <h1>IRON CONTACS</h1>
      <button onClick={addRandomContact}>Add Random</button>
      <button onClick={sortByName}>sortByName</button>
      <button onClick={sortByPopularity}>sortByPopularity</button>
      
      

      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
  {finalContacts.map(({ id, name, pictureUrl, popularity, wonOscar, wonEmmy }) => (
    <tr key={id}>
      <td>
        <img src={pictureUrl} alt={name} />
      </td>
      <td>{name}</td>
      <td>{popularity.toPrecision(4)}</td>
      <td>{wonOscar && "oscar"}</td>
      <td>{wonEmmy && "emmy"}</td>
      <td>
        <button onClick={() => deleteContact(id)}>Delete Contact</button>
      </td>
    </tr>
  ))}
</tbody>

    </div>
    )
  }
export default App;

