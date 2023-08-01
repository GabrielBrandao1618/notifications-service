import { Connection, connect } from 'amqplib';

let connection: Connection;
export async function getRabbitMqConnection() {
  if (connection) {
    return connection;
  }
  connection = await connect('amqp://localhost:5672');
  return connection;
}
