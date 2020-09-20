import { createModel } from 'hox';
import { DEVICE_ID_KEY } from '@/constants';
import { useCallback, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { IUser } from 'shared/interface/model';
import { getUserInfo } from '@/api/modules/user';

function generateDeviceIdAndSave() {
  const id = uuidV4();
  localStorage.setItem(DEVICE_ID_KEY, id);
  return id;
}

const storageId = localStorage.getItem(DEVICE_ID_KEY) || generateDeviceIdAndSave();
function useUser() {
  const [user, setUser] = useState<IUser>({ id: storageId } as IUser);
  const register = useCallback(() => {
    const newId = generateDeviceIdAndSave();
    setUser({
      ...user,
      id: newId,
    });
  }, [user]);

  const login = useCallback(async () => {
    const userInfo = await getUserInfo(user ? user.id : storageId);
    if (userInfo) {
      setUser(userInfo);
    }
  }, [user]);

  return {
    register,
    user,
    login,
  };
}

const useUserStore = createModel(useUser)
export default useUserStore;
