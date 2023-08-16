import './Button.css'

export interface ButtonProps {
	mode?: 'primary' | 'secondary'
	size?: 'small' | 'large'
	// Con este tipo, podremos pasar cualquier tipo de react, como elementos, texto y componentes. Esto le dará mucha flexibilidad a nuestro componente
	children?: React.ReactNode
	onClick?: () => void
	label?: string
	className?: string
}

/**
 * Componente botón
 * @param mode Como se mostrara nuestro botón (primary o secondary)
 * @param size Tamaño (small o large)
 * @param label Texto del botón, también se puede pasar como children
 * @method onClick Función que se ejecutará al hacer click, por defecto no hace nada
 */

function Button({ mode = 'primary', size = 'large', label, ...props }: ButtonProps) {
	const className = `btn btn-${mode} btn-${size}`

	return (
		<button type='button' className={className} {...props}>
			{label || props.children}
		</button>
	)
}

export default Button
