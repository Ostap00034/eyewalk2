import { FC, HTMLAttributes } from 'react'

interface IFieldProps extends HTMLAttributes<HTMLInputElement> {
	placeholder: string
	type: string
	value?: any
}

const Field: FC<IFieldProps> = ({ placeholder, type, ...props }) => {
	return (
		<input
			className='border-[#f2f2f2] h-16 py-5 px-4 rounded-xl font-manrope text-[14px] placeholder:font-manrope placeholder:font-normal outline-none border-[1px] bg-[#f6f7f8]'
			type={type}
			placeholder={placeholder}
			{...props}
		/>
	)
}

export default Field
