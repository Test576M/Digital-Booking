import Card from "../Card/Card"
import Option from "./Options"
import './PanelOptions.scss';

export default function PanelOptions({items, selectOption}) {

    return (
        
        <Card classList={'card-options'}>
            <div className="panel-options">
                {
                    items.map((item) => 
                        <Option key={item.id} id={item.id} title={item.nombreCiudad} subtitle={item.nombrePais} action={selectOption}/>
                    )
                }
            </div>
        </Card>
    )

}