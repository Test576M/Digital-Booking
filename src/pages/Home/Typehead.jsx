import { useRef, useState, useEffect } from 'react';
import PanelOptions from '../PanelOptions/PanelOptions';
import './Input.scss';
// import "../../core/services/cities"


export default function Typehead({
   type,
   label,
   name,
   id,
   icon,
   placeholder,
   isDisabled,
   setValue,
   errors,
   items,
   maxItemsLength,
   setInputValidation
}) {
   const typeheadRef = useRef();
   const [isInvalid, setInvalid] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
   const [itemsFiltered, setItemsFiltered] = useState([]);
   const [inputValue, setInputValue] = useState('');
   const [searching, setSearching] = useState(false);
   const [cities, setCities] = useState([]);
   const [filteredCities, setFilteredCities] = useState(cities);
   
   
   
   //Llamada a la api para obtener la lista de ciudades
   useEffect(()=> {
      fetch('http://13.59.110.188:8090/ciudades')
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.error(error))
   }, []);


   function CityFilter() {
      const handleFilter = (event) => {
        const searchTerm = event.target.value;
        const filtered = cities.filter((city) =>
            city.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCities(filtered);
      };
    
      return (
        <div>
          <label htmlFor="city-search">Buscar ciudad:</label>
          <input type="text" id="city-search" onChange={handleFilter} />
        </div>
      );
    }


// Maneja el evento click fuera del input para cerrar el panel de opciones
   useEffect(() => {
      const clickOutside = e => {
         if (searching && typeheadRef.current && !typeheadRef.current.contains(e.target)) {
            setSearching(false);
            handleChange('');
         }
      };

      document.addEventListener('mousedown', clickOutside);
      return () => {
         document.removeEventListener('mousedown', clickOutside);
      };
   }, [searching]);

   // Selecciona todo el contenido del input cuando se hace clic en él
   const handleClick = $event => {
      $event.target.select();
   };


// Función que se llama cuando se selecciona una opción en el panel de opciones
   const handleChange = option => {
// Valida que la opción seleccionada exista en los items y que pase todas las validaciones de errores
      const error = 
       errors
      .map(validationError => validationError(name))
      .reduce((messages, error) => `${error ? error + '.': ''} ${messages} `, '')
      if (items.some(item => item.id === option.id) && !Boolean(error.trim()))
// Establece el valor seleccionado como el valor del input y oculta el panel de opciones
       {  
         setValue(option.id);
         setInputValue(option.title);
         setInvalid(false);
         setInputValidation(true)
      } else {
// Si la opción seleccionada no es válida, muestra un mensaje de error
         setErrorMessage(error);
         setInvalid(true);
         setInputValidation(false)
      }
      setSearching(false);
   };

// Función que se llama cuando se cambia el valor del input
   const handleInputChange = $event => {
      setInputValue($event.target.value);

      if ($event.target.value.length >= 3) {
// Si el input tiene 3 o más caracteres, muestra el panel de opciones con las opciones filtradas
         setSearching(true);
         const filter = items.filter(item =>
            item.title.toLowerCase().includes($event.target.value.toLowerCase())
         );
         setItemsFiltered(
            filter.length
               ? filter.slice(0, maxItemsLength)
               : [{ id: 'NF', title: 'No se encontraron resultados' }]
         );
      } else {
// Si el input tiene menos de 3 caracteres, oculta el panel de opciones
         setSearching(false);
         setItemsFiltered([]);
      }
   };


// Renderiza el componente
   return (
      <div className="input" ref={typeheadRef}>
         {label ? (
            <label className="input-label" htmlFor={id}>
               {label}
            </label>
         ) : null}
         <div
            className={`input-wrapper ${isInvalid ? 'invalid' : ''} ${
               isDisabled ? 'disabled' : ''
            }`}>
            <span className="input-icon">{icon}</span>
            <input
               key={id}
               id={id}
               type={type}
               placeholder={placeholder}
               disabled={isDisabled}
               value={inputValue}
               onClick={handleClick}
               onChange={handleInputChange}
            />
         </div>
         {searching ? (
            <div className="panelContainer">
               <PanelOptions items={itemsFiltered} selectOption={handleChange} />
            </div>
         ) : null}
         {errorMessage && isInvalid ? <div className="input-error">{errorMessage}</div> : null}
      </div>
   );
}
