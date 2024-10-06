import axiosModule from 'axios';
import { envs } from '@global/configs/envs';

// Configuración de Axios con base URL
export const ag_usuario = axiosModule.create({
  baseURL: envs.baseUrlAgUsuario,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});
