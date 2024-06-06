"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

interface CardEventProps {

    uuid: string;
    title: string;
    date: string;
    imgUser: string;
    imgEvent: string;
    user: string;
    size?: "small" | "medium" | "full";
}

export default function CardEvent(props: CardEventProps) {
    const [fav, setFav] = useState(false);
    const { uuid, title, date, imgUser, imgEvent, user, size } = props;
    return (
        <article className={clsx(
            !size && "w-[220px]",
            size === "small" && "w-[220px]",
            size === "medium" && "w-[320px]",
            size === "full" && "w-full max-w-[670px]",
            "flex flex-col bg-[#D9D9D9] h-[395px] rounded-[20px] overflow-hidden group"
        )}>
            <header className={clsx(
                size === "full" && "h-12",
                "relative flex justify-start px-2 pt-[10px] gap-[5px] bg-[#D9D9D9] z-20"
            )}>
                {
                    size === "full" ? <Image
                        className="absolute w-[75xp] h-[75px] rounded-full border-2 border-[#D9D9D9] z-20"
                        src={imgUser}
                        alt={user}
                        height={75}
                        width={75}
                    /> : <Image
                        className="absolute w-[35xp] h-[35px] rounded-full border-2 border-[#D9D9D9] z-20"
                        src={imgUser}
                        alt={user}
                        height={35}
                        width={35}
                    />
                }
                <p className={clsx(
                    size === "full" ? "pl-20 pt-1" : "pl-10",
                    "text-base font-new font-medium")
                }
                >
                    {user}
                </p>
            </header>
            <main className="flex flex-col justify-start items-center w-full h-full overflow-hidden ">
                <Image
                    className="w-full h-[220px] object-cover group-hover:scale-110 transition-transform ease-in-out duration-1000 delay-200"
                    src={imgEvent}
                    alt={title}
                    height={670}
                    width={670} />
                <div className="w-full pt-[3px] pb-[6px] px-3 text-left z-20 bg-[#D9D9D9]">
                    <p className="text-xs font-new font-bold">{date.substring(0, 10)}</p>
                    <p className="text-2xl font-new font-extrabold">{title}</p>
                </div>
            </main>
            <footer className="flex justify-between items-center h-14 px-3 bg-[#030712]">
                <Link href={`/event/detail/${uuid}`} className="h-[30px] px-[18px] py-[6px] bg-[#F2F2F2] rounded-2xl text-sm">Ver más</Link>
                <button onClick={() => setFav(!fav)}>
                    <svg
                        className={clsx(
                            "hover:scale-125 transition-[transform_fill] ease-in-out",
                            fav ? "fill-[#F01919]" : "fill-[#F2F2F2]"
                        )}
                        xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path d="M11 18.6313C10.7861 18.6313 10.5685 18.5931 10.3473 18.5167C10.1261 18.4403 9.93115 18.3181 9.76248 18.15L8.18123 16.7063C6.56179 15.2243 5.09879 13.754 3.79223 12.2953C2.48567 10.8365 1.8327 9.22839 1.83331 7.47084C1.83331 6.03472 2.31456 4.83542 3.27706 3.87292C4.23956 2.91042 5.43887 2.42917 6.87498 2.42917C7.6847 2.42917 8.44859 2.60089 9.16665 2.94434C9.8847 3.28778 10.4958 3.75772 11 4.35417C11.5041 3.75834 12.1153 3.2887 12.8333 2.94525C13.5514 2.60181 14.3153 2.42978 15.125 2.42917C16.5611 2.42917 17.7604 2.91042 18.7229 3.87292C19.6854 4.83542 20.1666 6.03472 20.1666 7.47084C20.1666 9.22778 19.5173 10.8396 18.2187 12.3063C16.9201 13.7729 15.4458 15.2472 13.7958 16.7292L12.2375 18.15C12.0694 18.3181 11.8748 18.4403 11.6536 18.5167C11.4323 18.5931 11.2145 18.6313 11 18.6313Z" />
                    </svg>
                </button>
            </footer>
        </article>
    )
}
