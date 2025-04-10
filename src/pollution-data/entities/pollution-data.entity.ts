import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { CreatePollutionDatumDto } from '../dto/create-pollution-datum.dto';

@Exclude()
@Table({ timestamps: false, tableName: 'pollution_data' })
export class PollutionData extends Model<
  PollutionData,
  CreatePollutionDatumDto
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
  date: Date | null;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  @Expose()
  valeur: number | null;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  @Expose()
  validation: boolean | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @Expose()
  site_id: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @Expose()
  site_label: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @Expose()
  type_appareil_label: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @Expose()
  code_polluant: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @Expose()
  label_polluant: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @Expose()
  label_court_polluant: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @Expose()
  unite: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @Expose()
  label_unite: string | null;
}
