import React from 'react';
import User from '../../ot/User';

interface UsersListProps {
    users: { [userId: string]: User };
    myUserId: string;
}

/**
 * UsersList is a sidebar in the Document view that shows a
 * list of other users editing the same document.
 */
const UsersList: React.FC<UsersListProps> = ({ users, myUserId }) => {
    return (
        <div className="UsersList">
            <div className="heading">
                <span className="who-else">Who else is here?</span>
                {Object.keys(users).length > 1 &&
                    <span className="users-count">
                        ({Object.keys(users).length - 1} other{Object.keys(users).length !== 2 && 's'})
                    </span>
                }
            </div>

            <div className="users">
                {Object.keys(users).filter(userId => userId !== myUserId) // exclude self from users list
                    .map(userId => (
                        <div className="user" key={userId}>
                            <div className="user_color" style={{backgroundColor: users[userId].color}} />
                            <span className="user_nickname">{users[userId].nickname}</span>
                        </div>)
                    )
                }

                {/* render if current user is the only user editing the document */}
                {Object.keys(users).length === 1 &&
                    <div className="user">
                        <div className="user_color" style={{backgroundColor: '#d6cfc0'}} />
                        <span className="user_nickname just-you">Just you!</span>
                    </div>
                }
            </div>
        </div>
    );
};

export default UsersList;