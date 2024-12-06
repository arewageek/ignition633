import { connection, connect, Connection } from "mongoose";

const connectDB = async () => {
  //   if(Connection.on("C"))
  await connect(process.env.MONGODB_URL!);
};

export default connectDB;
