export interface GroupInterface{
    uid: string;
    name: string;
    description: string;
    coverPhoto?: string;
    owner: string;
    members?: string[];
    transactions?: string[];
    notifications?: string[];
    activities?: string[];
    token?: string[];
}