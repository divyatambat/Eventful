import { Key } from "react";

export type TVenue = {
    id: Key | null | undefined;
    name: string;
    venue_type: string;
    start_time: Date;
    end_time: Date;
}

export type UserLogin = {
    email : string;
    password: string;
}
