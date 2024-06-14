import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { clsx } from 'clsx';

type BaseInputProps = {
    name: string;
    placeholder?: string;
    label: string;
    register: UseFormRegister<any>;
    errors: FieldErrors;
    startIcon?: JSX.Element;
    icon?: JSX.Element;
    gendersOptions?: JSX.Element[];
};

type TextInputProps = BaseInputProps & React.InputHTMLAttributes<HTMLInputElement> & {
    type: 'text' | 'number' | 'checkbox' | 'email' | 'password' | 'datetime-local' | 'date' | 'file'; // otros tipos de input que no sean 'select'
};

type SelectInputProps = BaseInputProps & React.InputHTMLAttributes<HTMLInputElement> & {
    type: 'select';
    label: string;
    gendersOptions: JSX.Element[];
};

type InputProps = TextInputProps | SelectInputProps;

export default function Input(props: InputProps) {
    const { name, placeholder, type, label, register, errors, gendersOptions, icon, startIcon, ...otherProps } = props;
    return (
        <div
            className={clsx(
                type === "checkbox" ? "peer/check flex flex-row-reverse justify-center gap-2 mt-6 items-center text-[#1F2937]" : "relative flex flex-col gap-1 mt-[10px]",
                errors[name] && "text-red-700"
            )}
        >
            <label htmlFor={name} className={clsx(
                type === "checkbox" ? "flex flex-row-reverse justify-center items-center gap-2 select-none cursor-pointer" : "absolute top-2 left-6 text-xs text-[#383838]",
                errors[name] && "text-red-700"
            )}>
                {label}
                {type === "checkbox" &&
                    <div className='flex flex-row-reverse justify-center items-center select-none cursor-pointer'>
                        <input
                            className='peer appearance-none'
                            type={type}
                            id={name}
                            placeholder={placeholder}
                            {...register(name)}
                            {...otherProps}
                        />
                        <span
                            className={`inline-block w-5 h-5 rounded-full border-[#1F2937] border-2 relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[10px] after:h-[10px] after:bg-[#1F2937] after:rounded-full after:opacity-0 peer-checked:after:opacity-100`}
                        ></span>
                    </div>
                }

            </label>

            {type !== "checkbox" && <input
                className={clsx(
                    type === "select" && "hidden",
                    type === "datetime-local" && "form-date__input custom-date-input",
                    type === "date" && "form-date__input custom-date-input",
                    type === "file" && "form-file__input custom-file-input pt-[22px]",
                    "rounded-full h-[61px] pt-1 px-6 w-full bg-zinc-300 placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent text-[#383838]",
                    errors[name] && "text-red-700 focus:ring-red-500 bg-red-200"
                )}
                type={type}
                id={name}
                placeholder={placeholder}
                {...register(name)}
                {...otherProps}
            />}

            {
                icon && <div className='absolute top-[35%] left-[87%]'>
                    {icon}
                </div>
            }
            {startIcon && <div className='absolute top-[20%] left-[6%]'>
                {startIcon}
            </div>}
            {
                type === "datetime-local" &&
                <svg className='absolute top-[35%] left-[87%]' xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22" fill="none">
                    <path d="M15.4167 4.24056V4.03059C15.4167 3.12263 15.1269 2.25185 14.6112 1.60983C14.0955 0.967803 13.396 0.607117 12.6667 0.607117C11.9373 0.607117 11.2378 0.967803 10.7221 1.60983C10.2064 2.25185 9.91667 3.12263 9.91667 4.03059H8.08333C8.08333 3.12263 7.7936 2.25185 7.27788 1.60983C6.76215 0.967803 6.06268 0.607117 5.33333 0.607117C4.60399 0.607117 3.90451 0.967803 3.38879 1.60983C2.87306 2.25185 2.58333 3.12263 2.58333 4.03059V4.24056C2.04878 4.4753 1.58564 4.91014 1.25741 5.48546C0.929189 6.06078 0.75195 6.7484 0.75 7.45406V17.7245C0.75 19.6119 1.98383 21.1479 3.5 21.1479H14.5C16.0162 21.1479 17.25 19.6119 17.25 17.7245V7.45406C17.2481 6.7484 17.0708 6.06078 16.7426 5.48546C16.4144 4.91014 15.9512 4.4753 15.4167 4.24056ZM11.75 4.03059C11.75 3.72793 11.8466 3.43768 12.0185 3.22367C12.1904 3.00966 12.4236 2.88943 12.6667 2.88943C12.9098 2.88943 13.1429 3.00966 13.3148 3.22367C13.4868 3.43768 13.5833 3.72793 13.5833 4.03059V6.3129C13.5833 6.61555 13.4868 6.90581 13.3148 7.11982C13.1429 7.33383 12.9098 7.45406 12.6667 7.45406C12.4236 7.45406 12.1904 7.33383 12.0185 7.11982C11.8466 6.90581 11.75 6.61555 11.75 6.3129V4.03059ZM4.41667 4.03059C4.41667 3.72793 4.51324 3.43768 4.68515 3.22367C4.85706 3.00966 5.09022 2.88943 5.33333 2.88943C5.57645 2.88943 5.80961 3.00966 5.98151 3.22367C6.15342 3.43768 6.25 3.72793 6.25 4.03059V6.3129C6.25 6.61555 6.15342 6.90581 5.98151 7.11982C5.80961 7.33383 5.57645 7.45406 5.33333 7.45406C5.09022 7.45406 4.85706 7.33383 4.68515 7.11982C4.51324 6.90581 4.41667 6.61555 4.41667 6.3129V4.03059ZM15.4167 17.7245C15.4167 18.3532 15.006 18.8656 14.5 18.8656H3.5C2.994 18.8656 2.58333 18.3532 2.58333 17.7245V10.8775H15.4167V17.7245Z" fill="#383838" />
                </svg>
            }
            {
                type === "date" &&
                <svg className='absolute top-[35%] left-[87%]' xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22" fill="none">
                    <path d="M15.4167 4.24056V4.03059C15.4167 3.12263 15.1269 2.25185 14.6112 1.60983C14.0955 0.967803 13.396 0.607117 12.6667 0.607117C11.9373 0.607117 11.2378 0.967803 10.7221 1.60983C10.2064 2.25185 9.91667 3.12263 9.91667 4.03059H8.08333C8.08333 3.12263 7.7936 2.25185 7.27788 1.60983C6.76215 0.967803 6.06268 0.607117 5.33333 0.607117C4.60399 0.607117 3.90451 0.967803 3.38879 1.60983C2.87306 2.25185 2.58333 3.12263 2.58333 4.03059V4.24056C2.04878 4.4753 1.58564 4.91014 1.25741 5.48546C0.929189 6.06078 0.75195 6.7484 0.75 7.45406V17.7245C0.75 19.6119 1.98383 21.1479 3.5 21.1479H14.5C16.0162 21.1479 17.25 19.6119 17.25 17.7245V7.45406C17.2481 6.7484 17.0708 6.06078 16.7426 5.48546C16.4144 4.91014 15.9512 4.4753 15.4167 4.24056ZM11.75 4.03059C11.75 3.72793 11.8466 3.43768 12.0185 3.22367C12.1904 3.00966 12.4236 2.88943 12.6667 2.88943C12.9098 2.88943 13.1429 3.00966 13.3148 3.22367C13.4868 3.43768 13.5833 3.72793 13.5833 4.03059V6.3129C13.5833 6.61555 13.4868 6.90581 13.3148 7.11982C13.1429 7.33383 12.9098 7.45406 12.6667 7.45406C12.4236 7.45406 12.1904 7.33383 12.0185 7.11982C11.8466 6.90581 11.75 6.61555 11.75 6.3129V4.03059ZM4.41667 4.03059C4.41667 3.72793 4.51324 3.43768 4.68515 3.22367C4.85706 3.00966 5.09022 2.88943 5.33333 2.88943C5.57645 2.88943 5.80961 3.00966 5.98151 3.22367C6.15342 3.43768 6.25 3.72793 6.25 4.03059V6.3129C6.25 6.61555 6.15342 6.90581 5.98151 7.11982C5.80961 7.33383 5.57645 7.45406 5.33333 7.45406C5.09022 7.45406 4.85706 7.33383 4.68515 7.11982C4.51324 6.90581 4.41667 6.61555 4.41667 6.3129V4.03059ZM15.4167 17.7245C15.4167 18.3532 15.006 18.8656 14.5 18.8656H3.5C2.994 18.8656 2.58333 18.3532 2.58333 17.7245V10.8775H15.4167V17.7245Z" fill="#383838" />
                </svg>
            }
            {
                type === "file" &&
                <svg className='absolute top-[35%] left-[87%]' xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M17.1831 4.81689C16.5642 4.19823 15.725 3.85069 14.85 3.85069C13.9749 3.85069 13.1357 4.19823 12.5169 4.81689L4.81688 12.5169C4.21561 13.1391 3.88279 13.9726 3.89011 14.8379C3.89742 15.7031 4.24428 16.5309 4.85599 17.1429C5.46769 17.7549 6.29529 18.1021 7.16054 18.1099C8.02579 18.1176 8.85945 17.7852 9.48198 17.1842H9.48308L10.0298 16.6342C10.1849 16.4833 10.393 16.3994 10.6094 16.4005C10.8257 16.4017 11.033 16.4877 11.1865 16.6402C11.34 16.7927 11.4274 16.9994 11.43 17.2158C11.4326 17.4321 11.35 17.6408 11.2002 17.7969L10.6524 18.348L10.6502 18.3502C9.72187 19.2785 8.46281 19.8 7.14998 19.8C5.83715 19.8 4.57809 19.2785 3.64978 18.3502C2.72147 17.4219 2.19995 16.1628 2.19995 14.85C2.19995 13.5372 2.72147 12.2781 3.64978 11.3498L11.3498 3.64979C12.2775 2.72089 13.5362 2.19858 14.8491 2.19775C16.1619 2.19693 17.4213 2.71766 18.3502 3.64539C19.2791 4.57311 19.8014 5.83184 19.8022 7.14467C19.803 8.4575 19.2823 9.71689 18.3546 10.6458L14.5541 14.5541C14.2887 14.8339 13.97 15.0578 13.6167 15.2124C13.2634 15.3671 12.8828 15.4494 12.4971 15.4545C12.1115 15.4597 11.7288 15.3875 11.3715 15.2423C11.0143 15.0971 10.6897 14.8818 10.417 14.6091C10.1443 14.3364 9.92901 14.0118 9.7838 13.6545C9.63859 13.2973 9.56641 12.9145 9.57154 12.5289C9.57666 12.1433 9.65898 11.7626 9.81363 11.4093C9.96828 11.0561 10.1921 10.7373 10.472 10.472L14.267 6.67589C14.343 6.59705 14.4341 6.53416 14.5347 6.49088C14.6353 6.44759 14.7436 6.42478 14.8531 6.42378C14.9626 6.42278 15.0713 6.4436 15.1727 6.48503C15.2741 6.52647 15.3663 6.58768 15.4437 6.66511C15.5212 6.74253 15.5825 6.83462 15.6241 6.93599C15.6656 7.03736 15.6865 7.14598 15.6856 7.25552C15.6847 7.36507 15.662 7.47333 15.6188 7.57401C15.5756 7.67468 15.5128 7.76574 15.4341 7.84189L11.6391 11.638C11.5239 11.7526 11.4324 11.8888 11.3698 12.0388C11.3072 12.1888 11.2748 12.3496 11.2744 12.5121C11.274 12.6746 11.3056 12.8356 11.3674 12.9859C11.4292 13.1362 11.5201 13.2729 11.6347 13.3881C11.7493 13.5033 11.8855 13.5948 12.0355 13.6574C12.1855 13.7199 12.3463 13.7523 12.5088 13.7527C12.6713 13.7532 12.8323 13.7215 12.9826 13.6597C13.1329 13.5979 13.2696 13.5071 13.3848 13.3925L17.1842 9.48419C17.8028 8.86534 18.1504 8.02613 18.1504 7.15109C18.1504 6.27604 17.8028 5.43683 17.1842 4.81799" fill="#1F2937" />
                </svg>
            }

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
            {errors[name] && <span className="text-sm text-red-700">{String(errors[name]?.message)}</span>}
        </div>
    );
}