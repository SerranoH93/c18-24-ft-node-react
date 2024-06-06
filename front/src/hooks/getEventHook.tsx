import axios, {AxiosRequestConfig, Method} from "axios";

export interface Event {
    id: string;
    name: string;
    date: string;
    imgUser: string;
    event_poster_url: string;
    user: string;
}

export const fetchEvents = async (
    endpoint: string,
    options?: AxiosRequestConfig<any>        
): Promise<Event[]> => {
    try {
        const { data } = await axios({
            url: `https://65ea5569c9bf92ae3d3b6591.mockapi.io/api/v1/${endpoint}`,
            method: 'get',
            ...options
        });
        
        console.log(data);

        return data as Event[];

    } catch (error: any) {
        console.log('error');
        throw error;
    }
}
