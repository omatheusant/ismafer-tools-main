interface InputProps {
  type: string
  value: any,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string
  id: string
  placeholder?: string
}



export default function Input({ type, value, onChange, name, id, placeholder }: InputProps) {
  return (
      <input
        name={name}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input input-bordered w-[30vw] bg-[--dark]" />
  )
}