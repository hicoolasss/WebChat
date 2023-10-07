import React, { useContext, useEffect } from 'react';
import { Context } from "../index";
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';  // Подразумевается, что у вас установлен mobx-react или mobx-react-lite

import '../style/friends.css';

const Friends = observer(() => {
    const { store } = useContext(Context);

    useEffect(() => {
        const fetchAndStoreUsers = async () => {
            let users = JSON.parse(localStorage.getItem('users') || '[]');

            if (users.length === 0) {
                try {
                    await store.fetchUsers();
                    users = toJS(store.users);
                    localStorage.setItem('users', JSON.stringify(users));
                    console.log("Пользователи загружены и сохранены в localStorage");
                } catch (error) {
                    console.error("Ошибка при загрузке пользователей:", error);
                }
            } else {
                store.setUsers(users);  // предполагая, что у вас есть такой метод
            }

        };

        fetchAndStoreUsers();
    }, [store]);

    return (
        <div>
            <h1>hello it is friends</h1>
            {Array.isArray(toJS(store.users)) && toJS(store.users).map(user => (
                <div className="listusers" key={user._id}>{user.username}</div>
            ))}
        </div>
    );
});

export default Friends;
