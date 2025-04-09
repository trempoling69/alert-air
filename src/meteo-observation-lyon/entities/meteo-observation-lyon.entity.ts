import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { CreateMeteoObservationLyonDto } from '../dto/create-meteo-observation-lyon.dto';

@Exclude()
@Table({ timestamps: false, tableName: 'meteo_observations_lyon' })
export class MeteoObservationLyon extends Model<
  MeteoObservationLyon,
  CreateMeteoObservationLyonDto
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
    allowNull: false,
  })
  @Expose()
  date: Date | null;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  @Expose()
  precipitation_mm: number | null;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  @Expose()
  temperature_min: number | null;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  @Expose()
  temperature_max: number | null;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  @Expose()
  temperature_moy: number | null;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  @Expose()
  vent_moyen: number | null;
}
