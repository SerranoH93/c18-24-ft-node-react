import { UseFormRegister, FieldErrors } from 'react-hook-form';

type BaseInputProps = {
    name: string;
    placeholder?: string;
    label?: string;
    register: UseFormRegister<any>;
    errors: FieldErrors;
    icon?: JSX.Element;
    gendersOptions?: JSX.Element[];
};

type TextInputProps = BaseInputProps & {
    type: 'text' | 'checkbox' | 'email' | 'password'; // otros tipos de input que no sean 'select'
};

type SelectInputProps = BaseInputProps & {
    type: 'select';
    gendersOptions: JSX.Element[];
};

type InputProps = TextInputProps | SelectInputProps;

export default function Input(props: InputProps) {
    const { name, placeholder, type, label, register, errors, gendersOptions, icon } = props;
    return (
        <div className={`relative flex flex-col gap-1 mt-5`}>
            <label htmlFor={name} className={`${type === "checkbox" ? "flex flex-row-reverse justify-between items-center text-[#1F2937]" : "relative flex flex-col"} ${errors[name] && "text-red-700"} gap-2`}>{type === "select" ? "" : label}
                <input
                    className={`${type === "select" && "hidden"} ${type === "checkbox" ? "peer cursor-pointer hidden after:opacity-100" : "rounded-full h-[61px] py-3 px-6 w-full bg-zinc-300 placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent text-[#383838]"} ${errors[name] && "text-red-700 focus:ring-red-500 bg-red-200"}`}
                    type={type}
                    id={name}
                    placeholder={placeholder}
                    {...register(name)}
                />
                <div className='absolute top-[35%] left-[87%]'>
                    {icon}
                </div>
                {type === "select" &&
                    <div className='relative'>
                        <label htmlFor={name} className={`absolute top-2 left-6 text-xs text-[#383838] ${errors[name] && "text-red-700"}`}>{label}</label>
                        <select className="appearance-none text-[#383838] w-full h-[61px] rounded-full pt-1 px-6 bg-zinc-300"
                            id={name}
                            {...register(name)}>
                            {gendersOptions}
                        </select>
                        <svg className='absolute pointer-events-none top-[32%] left-[87%]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M7 10L12 15L17 10H7Z" fill="#1F2937" />
                        </svg>
                    </div>
                }
                {type === "checkbox" && <span
                    className={`inline-block w-5 h-5 rounded-full border-[#1F2937] border-2 relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[10px] after:h-[10px] after:bg-[#1F2937] after:rounded-full after:opacity-0 peer-checked:after:opacity-100 ${errors[name] && "border-red-700"}`}
                ></span>}
            </label>
            {errors[name] && <span className="text-sm text-red-700">{String(errors[name]?.message)}</span>}
        </div>
    );
}