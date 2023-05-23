
export interface IRegister{
                             username: string,
                             email: string,
                            password: string,
                             confirmPassword:string
                          }
                          
export interface ISignin{
                          identifier: string
                          password: string
                        }

export interface IUser{
                        id: number
                        username: string
                        email: string
                        provider: string
                        confirmed: boolean
                        blocked: boolean
                        createdAt: string
                        updatedAt: string
                      }

export interface IAuthResponse{
                        jwt: string
                        user: IUser
                      }

export interface IUserRole{
                        id: number
                        name: string
                        description: string
                        type: string
                        createdAt: string
                        updatedAt: string
                      }

export interface IUserAndRole extends IUser{
                                            role:IUserRole
                                      }
