import {
  Column,
  Table,
  Model,
  DataType,
  IsEmail,
  Length,
} from "sequelize-typescript";

/**
 * Sequelize model validations: https://github.com/sequelize/sequelize-typescript#model-validation
 */

@Table({
  tableName: "users",
})
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id",
  })
  id?: number;

  @Length({ min: 2, max: 50 })
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: "firstname",
  })
  firstName: string;

  @Column({
    type: DataType.STRING(255),
    field: "lastName",
  })
  lastName: string;

  @Column({
    type: DataType.INTEGER,
    field: "age",
  })
  age: string;

  @Column({
    type: DataType.INTEGER,
    field: "yearsOfExperience",
  })
  yearsOfExperience: string;

  @IsEmail
  @Column({
    type: DataType.STRING(255),
    field: "email",
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING(255),
    field: "picture",
  })
  picture?: string;
}
