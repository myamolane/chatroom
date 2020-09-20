import { createModel } from 'hox';
import { DEVICE_ID_KEY } from '@/constants';
import { useCallback, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { IUser } from 'shared/interface/model';

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
  // const login = useCallback(() => {

  // }, []);
  return {
    register,
    user,
  };
}

const useUserStore = createModel(useUser)
export default useUserStore;
