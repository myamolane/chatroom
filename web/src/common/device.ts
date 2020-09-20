import { DEVICE_ID_KEY } from "@/constants";

import { v4 as uuidV4} from 'uuid';

export let deviceId = localStorage.getItem(DEVICE_ID_KEY);

export function register() {
  deviceId = uuidV4();
  localStorage.setItem(DEVICE_ID_KEY, deviceId);
}

export function initDevice() {
  if (!deviceId) {
    register();
  }
}
