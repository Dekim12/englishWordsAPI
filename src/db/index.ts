import { connect, connection, Connection } from 'mongoose';

const connectToDB = async (connectionString: string): Promise<void> => {
  await connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db: Connection = connection;

  console.log('Connected to DB successfully');
  db.on('error', () => console.log('connection error:'));
};

export default connectToDB;
