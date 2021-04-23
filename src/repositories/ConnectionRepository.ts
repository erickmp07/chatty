import { Repository } from "typeorm";
import { Connection } from "../entities/Connection";


class ConnectionRepository extends Repository<Connection> {

}

export { ConnectionRepository };