import bcrypt from 'bcryptjs';

const data = {
    users: [
      {
        id:1,
        name: 'Carlos',
        email: 'edcartech@gmail.com',
        password: bcrypt.hashSync('123456'),
        isAdmin: true,
      },
      {
        id:2,
        name: 'Doris',
        email: 'doris@gmail.com',
        password: bcrypt.hashSync('123456'), 
        isAdmin: false,
      },
    ],
}

export const regionsGhana = [
    {
        id: 'Ashanti Region',
        itemValue: 'Ashanti Region'
    },
    {
        id: 'Brong Ahafo Region',
        itemValue: 'Brong Ahafo Region'
    },
    {
        id: 'Central Region',
        itemValue: 'Central Region'
    },
    {
        id: 'Eastern Region',
        itemValue: 'Eastern Region'
    },
    {
        id: 'Greater Accra Region',
        itemValue: 'Greater Accra Region'
    },
    {
        id: 'Northern Region',
        itemValue: 'Northern Region'
    },
    {
        id: 'Upper East Region',
        itemValue: 'Upper East Region'
    },
    {
        id: 'Upper West Region',
        itemValue: 'Upper West Region'
    },
    {
        id: 'Volta Region',
        itemValue: 'Volta Region'
    },
    {
        id: 'Western Region',
        itemValue: 'Western Region'
    },
    {
        id: 'Bono Region',
        itemValue: 'Bono Region'
    },
    {
        id: 'Oti Region',
        itemValue: 'Oti Region'
    },
    {
        id: 'North East Region', 
        itemValue: 'North East Region'
    },
    {
        id: 'Savannah Region',
        itemValue: 'Savannah Region'
    },
    {
        id: 'Western North Region',
        itemValue: 'Western North Region'
    },
    {
        id: 'Bono East Region',
        itemValue: 'Bono East Region'
    },
]
