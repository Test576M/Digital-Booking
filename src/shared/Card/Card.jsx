import './Card.scss';

export default function Card({classList, children}) {
    return (
        <div className={`card ${classList}`}>
            {children}
        </div>
    )
}