// hooks
import {useAuth} from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();

  return (
    <Avatar
      src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
      // src={user?.photoURL}
      alt={user?.display_name}
      color={user?.photoURL ? 'default' : createAvatar(user?.display_name).color}
      {...other}
    >
      {createAvatar(user?.display_name).name}
    </Avatar>
  );
}
