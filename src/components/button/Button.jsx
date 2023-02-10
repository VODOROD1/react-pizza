import React from 'react';

const Button = React.memo(
    ({onPlus, onMinus}) => {
        console.log('Button rerender!');
    
        return (
            <div>
                <button onClick={onPlus}>+</button>
                <button onClick={onMinus}>-</button>
            </div>
        )
    }, (prev, current) => {
        
    }
)

export default Button;