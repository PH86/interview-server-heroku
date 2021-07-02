interface IUser {
    userName: string,
    firstName: string,
    lastName: string,
    company: string,
    subscription: string
}

export const users: IUser[] = [
    {
        userName: 'user1',
        firstName: 'john',
        lastName: 'doe',
        company: 'green',
        subscription: 'full'
    }, {
        userName: 'user2',
        firstName: 'joan',
        lastName: 'davis',
        company: 'green',
        subscription: 'half'
    }, {
        userName: 'user3',
        firstName: 'phil',
        lastName: 'tayloy',
        company: 'green',
        subscription: 'free'
    }, {
        userName: 'user4',
        firstName: 'john',
        lastName: 'doe',
        company: 'green',
        subscription: 'full'
    }, {
        userName: 'user5',
        firstName: 'joan',
        lastName: 'davis',
        company: 'green',
        subscription: 'half'
    }, {
        userName: 'user6',
        firstName: 'phil',
        lastName: 'tayloy',
        company: 'green',
        subscription: 'free'
    }
]