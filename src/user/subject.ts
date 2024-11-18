import { DataTypes, Model, Sequelize, Optional } from 'sequelize';

interface SubjectAttributes {
    id: number;
    title: string;
}

interface SubjectCreationAttributes extends Optional<SubjectAttributes, 'id'> { }

export class Subject extends Model<SubjectAttributes, SubjectCreationAttributes> implements SubjectAttributes {
    public id!: number;
    public title!: string;
}

export const SubjectModel = (sequelize: Sequelize) => {
    Subject.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            sequelize,
            tableName: 'subjects',
        }
    );

    return Subject;
};
