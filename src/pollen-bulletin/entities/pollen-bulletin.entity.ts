import { Exclude, Expose } from 'class-transformer';
import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { CreatePollenBulletinDto } from '../dto/create-pollen-bulletin.dto';

@Exclude()
@Table({ timestamps: false, tableName: 'pollen_bulletins' })
export class PollenBulletin extends Model<
  PollenBulletin,
  CreatePollenBulletinDto
> {
  @PrimaryKey
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  @Expose()
  id: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  @Expose()
  bulletin_date: Date | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @Expose()
  station: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @Expose()
  designation: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @Expose()
  nom_latin: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @Expose()
  quantite: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @Expose()
  raep: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @Expose()
  type: string | null;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  details: string | null;
}
