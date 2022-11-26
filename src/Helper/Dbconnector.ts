import mongoose from "mongoose";

/**
 * connect to the db with connection string as param
 */
export default (database: string) => {
  const connect = () => {
    mongoose
      .connect(encodeURI(database), { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('Successfully connected to mongo.');
        return 'connected mongo';
      })
      .catch((err) => {
        console.log('Error connecting to mongo.', err);
      });
  };
  connect();
  mongoose.connection.on("disconnected", () => {
    console.log(`Db disconnected`);
  });

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
};
