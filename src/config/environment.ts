import { getSessionItem } from "../utils/useSession";

export const DEFAULT_IMAGE = import.meta.env.VITE_DEFAULT_IMAGE;
export const PROFILE_IMAGE = `${getSessionItem({
  name: 'user'
}).then((res) => res.data.photoURL)}?export=view`