
export type User = {
    _id: string;
    name: string;
    email: string;
    token: string;
    isAdmin: boolean;
}

// UserInfo type alias for consistency (used in some components)
export type UserInfo = User;



