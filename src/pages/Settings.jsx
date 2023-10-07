import React, { useState } from 'react';

import '../style/settings.css'

function Settings() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [notifications, setNotifications] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleNotificationsChange = (event) => {
        setNotifications(event.target.checked);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle form submission here
    };

    return (

        <div className='secondary_window'>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={handleNameChange} />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={handleEmailChange} />
                </label>
                <label>
                    Notifications:
                    <input type="checkbox" checked={notifications} onChange={handleNotificationsChange} />
                </label>
                <button type="submit">Save</button>
            </form>
        </div>


    );
}

export default Settings;
