import { IChatroom } from "shared/interface/model";

import initTable from "./generator";
const messages = initTable<IChatroom>("id", [
  { id: "default", name: '公共频道', messages: [], users: [], createdAt: Date.now(), updatedAt: Date.now() },
]);
export default messages;
