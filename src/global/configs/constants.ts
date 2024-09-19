import { envs } from './envs';

const constantes = {
  codigoServicioPrincipal: 'ag_agenda',
  nombreStore: {
    parametroSistema: 'ParametrosSistema',
    agenda: 'Agendas',
    agendamiento: 'Agendamientos',
    configAgendaLocal: 'ConfigAgendaLocal',
  },
  parametroBusqueda: {
    baseUrlAgUsuario: 'base_url_ag_usuario',
    baseUrlAgCliente: 'base_url_ag_cliente',
    baseUrlAgProfesional: 'base_url_ag_profesional',
    baseUrlAgAgenda: 'base_url_ag_agenda',
  },
};

if (envs.modoTest) {
  constantes.nombreStore.parametroSistema += '_test';
  constantes.nombreStore.agenda += '_test';
  constantes.nombreStore.agendamiento += '_test';
  constantes.nombreStore.configAgendaLocal += '_test';
}

export const constants = constantes;
