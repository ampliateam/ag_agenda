import { IAgenda, IAgendamiento, IConfigAgendaLocal, IParametroSistema } from '@global/models/ag_agenda';

const mongoToModel = (mongo: any) => {
  if (!mongo) return null;

  const mongoObj = mongo.toObject();
  const mongoKeys = Object.keys(mongoObj);

  const obj = {};
  mongoKeys.map((key) => (obj[key] = mongoObj[key]));
  obj['_id'] = obj['_id'].toString();

  return obj;
};

export const mongoToParametroBusqueda = (mongo: any): IParametroSistema => {
  return mongoToModel(mongo) as IParametroSistema;
};

export const mongoToAgenda = (mongo: any): IAgenda => {
  return mongoToModel(mongo) as IAgenda;
};

export const mongoToAgendamiento = (mongo: any): IAgendamiento => {
  return mongoToModel(mongo) as IAgendamiento;
};

export const mongoToConfigAgendaLocal = (mongo: any): IConfigAgendaLocal => {
  return mongoToModel(mongo) as IConfigAgendaLocal;
};
