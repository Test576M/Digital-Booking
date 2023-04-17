import Button from '../../../../shared/Button/Button';
import CalendarIcon from '../../../../shared/Icons/CalendarIcon';
import LocationIcon from '../../../../shared/Icons/LocationIcon';
import Input from '../../../../shared/Input/Input';
import Typehead from '../../../../shared/Input/Typehead';
import { getValidationErrors } from '../../../../utils/validationErrors';

const Searcher = 
({ setDate, setPlace, setPlaceValidation, setDateValidation, typeHeadOptions }) => {
   return (
      <section className="searcher">
         <h1>Busca ofertas en hoteles, casas y mucho más</h1>
         <div className="inputs">
            <Typehead
               type={'text'}
               placeholder={'¿A donde vamos?'}
               icon={<LocationIcon />}
               isDisabled={false}
               errors={getValidationErrors('typehead', true)}
               setValue={setPlace}
               items={typeHeadOptions}
               maxItemsLength={4}
               name={'Destino'}
               setInputValidation={setPlaceValidation}
            />
            <Input
               icon={<CalendarIcon />}
               placeholder1={'Fecha de inicio'}
               placeholder2={'Fecha de salida'}
               type="date-picker"
               errors={getValidationErrors('datepicker', true)}
               setValue={setDate}
               minDate={new Date()}
               setInputValidation={setDateValidation}
            />
            <Button classList={'searchButton button-primary'}>Buscar</Button>
         </div>
      </section>
   );
};

export default Searcher;
