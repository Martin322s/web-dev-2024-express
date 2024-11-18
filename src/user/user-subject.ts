import { DataTypes, Model, Sequelize } from 'sequelize';

interface UserSubjectAttributes {
  userId: number;
  subjectId: number;
}

export class UserSubject extends Model<UserSubjectAttributes> implements UserSubjectAttributes {
  public userId!: number;
  public subjectId!: number;
}

export const UserSubjectModel = (sequelize: Sequelize) => {
  UserSubject.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
      },
      subjectId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'subjects',
          key: 'id',
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'user_subjects'
    }
  );

  return UserSubject;
};
