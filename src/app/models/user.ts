export interface IAuthUser {
 login: string,
 password: string
}

export interface IRegisterUser extends IAuthUser {
    email: string
}

export interface IRegUserRes {
    status: string
}

export interface IAuthUserRes extends IRegisterUser {
}
