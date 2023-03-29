import { Connection, connect } from 'amqplib';

let connection: Connection;
export async function getRabbitMqConnection() {
  if (connection) {
    return connection;
  }
  connection = await connect("amqp://localhost");
  return connection;
}
