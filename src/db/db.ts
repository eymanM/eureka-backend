import * as pg from 'pg';
import {DataTypes, Model, Sequelize} from 'sequelize';

const sequelize = new Sequelize(process.env.POSTGRES_CONNECTION, {
  logging: false,
  dialect: 'postgres',
  dialectModule: pg,
});

export class Subscription extends Model {
  declare public id: string;
  declare public userId: string;
  declare public stripeCustomerId: string;
  declare public stripeSubscriptionId: string;
  declare public planName: string;
  declare public expiresAt: Date;
  declare public metadata: object;
  declare public createdAt: Date;
  declare public updatedAt: Date;
}

Subscription.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  stripeCustomerId: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  stripeSubscriptionId: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  planName: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  metadata: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: {},
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  underscored: true,
  modelName: 'Subscription',
  tableName: 'subscription',
});

export class User extends Model {
  declare public id: string;
  declare public name: string;
  declare public email: string;
  declare public password: string;
  declare public isAdmin: boolean;
  declare public lastLogin: Date;
  declare public metadata: object;
  declare public createdAt: Date;
  declare public updatedAt: Date;
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  metadata: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: {},
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  underscored: true,
  modelName: 'User',
  tableName: 'user',
});

export class ResourceUsage extends Model {
  declare public id: string;
  declare public userId: string;
  declare public resourceType: 'LLM_input_tokens' | 'LLM_output_tokens';
  declare public usage: number;
  declare public metadata: object;
  declare public createdAt: Date;
}

ResourceUsage.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  resourceType: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  usage: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  metadata: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: {},
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  underscored: true,
  modelName: 'ResourceUsage',
  tableName: 'resource_usage',
});

// Establish associations
User.hasMany(Subscription, {foreignKey: 'userId'});

export const syncDB = async () => {
  await sequelize.sync();
};
