import axios, {AxiosRequestConfig, Method} from "axios";

interface User {
    first_name: string;
    last_name: string;
    avatar_url: string;
}

interface Celebrity {
    celebrity_alias: string;
    users: User;
}

export interface Event {
    id: string;
    uuid: string;
    name: string;
    about: string;
    date: string;
    location: string;
    price: number;
    event_poster_url: string;
    celebrity_id: number;
    celebrities: Celebrity;
}


export const fetchEvents = async (
    endpoint: string,
    options?: AxiosRequestConfig<any>        
): Promise<Event[]> => {
    try {
        const { data } = await axios({
            url: `http://localhost:3001/api/${endpoint}`,
            method: 'get',
            ...options
        });
        
        console.log(data);

        return data.data as Event[];

    } catch (error: any) {
        console.log('error');
        throw error;
    }
}
