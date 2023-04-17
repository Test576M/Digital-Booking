import './PanelOptions.scss';

export default function Option({id, icon, title, subtitle, action}) {
    
    const selectedOption = () => {
        action({id, title})
    }

    return (
        <div className="option" onClick={selectedOption}>
            { icon ? <span className="option-icon" >{icon}</span> : null }
            <div className="option-item">
                <span className="option-item-title">{title}</span>
                <span className="option-item-subtitle">{subtitle}</span>
            </div>
        </div>
    )
}