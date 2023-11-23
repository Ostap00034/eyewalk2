import { FC, HTMLAttributes } from 'react'

interface IButtonProps extends HTMLAttributes<HTMLDivElement> {
	text: string
}

const Button: FC<IButtonProps> = ({ text, ...props }) => {
	return (
		<div
			{...props}
			className='py-[18px] text-center whitespace-nowrap h-min min-w-[30px] cursor-pointer bg-[#115ff9] px-8 text-[14px] font-bold text-white font-century-gothic rounded-xl'
		>
			{text}
		</div>
	)
}

export default Button
